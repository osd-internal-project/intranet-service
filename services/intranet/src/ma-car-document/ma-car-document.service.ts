import { Injectable } from '@nestjs/common';
import {
  MaCarDocumentFileRepository,
  MaCarDocumentRepository,
  MaCarRepository,
} from '@inventory/share';
import { Prisma } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';
import { extname } from 'path';
import {
  DOC_TYPES,
  DocStatusLevel,
  DocType,
  SLA_SOON_DAYS,
  WARNING_DAYS,
  daysUntil,
  getDocLevel,
} from './ma-car-document.status';
import { MinioClientService } from '../minio-client/minio-client.service';
import appConfig from '../configs';

const config = appConfig();

/** เอกสาร 1 งวด พร้อมสถานะที่คำนวณแล้ว ส่งให้ frontend ใช้ตรงๆ ไม่ต้องคำนวณซ้ำ */
interface DocumentWithStatus {
  documentId: string;
  docType: string;
  insuranceType: string | null;
  vender: string | null;
  policyNo: string | null;
  cost: number | null;
  startDate: Date;
  expireDate: Date;
  paidDate: Date | null;
  remark: string | null;
  status: boolean;
  files: unknown[];
  daysLeft: number | null;
  level: DocStatusLevel;
}

/** 1 แถวของตาราง matrix = รถ 1 คัน พร้อมเอกสารปัจจุบันของทั้ง 3 ประเภท */
interface CarDocMatrixRow {
  carId: string;
  carName: string;
  licensePlate: string | null;
  carType: string | null;
  carCategory: string | null;
  brand: string | null;
  model: string | null;
  fuelType: string | null;
  ownerName: string | null;
  insurance: DocumentWithStatus | null;
  act: DocumentWithStatus | null;
  tax: DocumentWithStatus | null;
  worstLevel: DocStatusLevel;
}

/** ลำดับความรุนแรง ใช้หา "สถานะที่แย่ที่สุด" ของรถ 1 คัน เพื่อระบายสีทั้งแถว */
const LEVEL_SEVERITY: Record<DocStatusLevel, number> = {
  expired: 3,
  warning: 2,
  none: 1,
  ok: 0,
};

@Injectable()
export class MaCarDocumentService {
  constructor(
    private readonly maCarRepository: MaCarRepository,
    private readonly maCarDocumentRepository: MaCarDocumentRepository,
    private readonly maCarDocumentFileRepository: MaCarDocumentFileRepository,
    private readonly minioService: MinioClientService,
  ) {}

  /**
   * แปลง Prisma.Decimal เป็น number
   * ถ้าส่ง Decimal ออกไปตรงๆ JSON จะกลายเป็น {"s":1,"e":3,"d":[...]} ซึ่ง frontend ใช้ไม่ได้
   */
  private toNumber(value: Prisma.Decimal | null): number | null {
    return value === null || value === undefined ? null : Number(value);
  }

  /** แนบ daysLeft + level ให้เอกสาร 1 งวด */
  private withStatus(doc: any): DocumentWithStatus {
    return {
      documentId: doc.documentId,
      docType: doc.docType,
      insuranceType: doc.insuranceType,
      vender: doc.vender,
      policyNo: doc.policyNo,
      cost: this.toNumber(doc.cost),
      startDate: doc.startDate,
      expireDate: doc.expireDate,
      paidDate: doc.paidDate,
      remark: doc.remark,
      status: doc.status,
      files: doc.maCarDocumentFile ?? [],
      daysLeft: daysUntil(doc.expireDate),
      level: getDocLevel(doc.expireDate),
    };
  }

  /**
   * ดึงรถทุกคันพร้อมเอกสาร (เฉพาะที่ยังไม่ถูกยกเลิก) เรียงวันหมดอายุจากใหม่ไปเก่า
   * query เดียวจบ ไม่มี N+1
   */
  private findCarsWithDocuments() {
    return this.maCarRepository.findMany({
      orderBy: { id: 'asc' },
      include: {
        maCarDocument: {
          where: { status: true },
          orderBy: { expireDate: 'desc' },
          include: { maCarDocumentFile: true },
        },
      },
    } as Prisma.maCarFindManyArgs);
  }

  /**
   * สร้างตาราง matrix: รถ 1 คัน = 1 แถว มีเอกสารปัจจุบันของทั้ง 3 ประเภท
   *
   * "เอกสารปัจจุบัน" = แถวที่ expireDate มากที่สุดในกลุ่ม status = true
   * เนื่องจาก query เรียง expireDate desc มาแล้ว ตัวแรกของแต่ละ docType จึงเป็นตัวปัจจุบัน
   * ใช้ expireDate แทน createdAt เพราะถ้าซื้อประกันปีหน้าล่วงหน้า ตัวที่คุ้มครองนานกว่าคือตัวที่ใช้จริง
   */
  private buildMatrix(cars: any[]): CarDocMatrixRow[] {
    return cars.map((car) => {
      const documents = car.maCarDocument ?? [];

      const current = {} as Record<DocType, DocumentWithStatus | null>;
      for (const docType of DOC_TYPES) {
        const latest = documents.find((doc: any) => doc.docType === docType);
        current[docType] = latest ? this.withStatus(latest) : null;
      }

      const levels = DOC_TYPES.map(
        (docType) => current[docType]?.level ?? 'none',
      );
      const worstLevel = levels.reduce((worst, level) =>
        LEVEL_SEVERITY[level] > LEVEL_SEVERITY[worst] ? level : worst,
      );

      return {
        carId: car.carId,
        carName: car.carName,
        licensePlate: car.licensePlate,
        carType: car.carType,
        carCategory: car.carCategory,
        brand: car.brand,
        model: car.model,
        fuelType: car.fuelType,
        ownerName: car.ownerName,
        insurance: current.insurance,
        act: current.act,
        tax: current.tax,
        worstLevel,
      };
    });
  }

  /** เอกสารปัจจุบันของแถวเข้าเงื่อนไขตัวกรองสถานะไหม — เช็คจาก daysLeft ให้ตรงกับการ์ดสรุป */
  private matchesStatus(row: CarDocMatrixRow, status: string): boolean {
    const docs = [row.insurance, row.act, row.tax];
    const inDays = (max: number) =>
      docs.some(
        (doc) =>
          doc != null &&
          doc.daysLeft !== null &&
          doc.daysLeft >= 0 &&
          doc.daysLeft <= max,
      );
    switch (status) {
      case 'expired':
        return docs.some((doc) => doc?.level === 'expired');
      case 'warning':
        return inDays(30);
      case 'warning60':
        return inDays(60);
      case 'none':
        return docs.some((doc) => doc == null);
      default:
        return true;
    }
  }

  /**
   * ตาราง matrix แบบแบ่งหน้าฝั่ง server + คืน `cars` (ทุกคัน) สำหรับเลี้ยง Select/lookup
   *
   * กรอง keyword + status ใน JS (สถานะเป็นค่า derived เขียน SQL ตรง ๆ ไม่ได้) แล้ว slice
   * `cars` = ทุกคันก่อนกรอง เพราะ dropdown เลือกรถ / เปิด drawer ต้องรู้จักรถทุกคัน ไม่ใช่แค่หน้านี้
   */
  async getMatrix(params?: {
    skip?: number;
    take?: number;
    keyword?: string;
    status?: string;
  }) {
    const cars = await this.findCarsWithDocuments();
    const full = this.buildMatrix(cars);

    const allCars = full.map((row) => ({
      carId: row.carId,
      carName: row.carName,
      licensePlate: row.licensePlate,
    }));

    let filtered = full;

    const keyword = params?.keyword?.trim().toLowerCase();
    if (keyword) {
      filtered = filtered.filter((row) =>
        [row.licensePlate, row.carName, row.brand, row.model, row.ownerName]
          .filter(Boolean)
          .join(' ')
          .toLowerCase()
          .includes(keyword),
      );
    }

    if (params?.status && params.status !== 'all') {
      filtered = filtered.filter((row) =>
        this.matchesStatus(row, params.status as string),
      );
    }

    const count = filtered.length;
    const data =
      params?.take !== undefined
        ? filtered.slice(params.skip ?? 0, (params.skip ?? 0) + params.take)
        : filtered;

    return { data, count, cars: allCars };
  }

  /**
   * ตัวเลขบนการ์ดสรุป — นับจาก "เอกสารปัจจุบัน" เท่านั้น
   * รถ 1 คันที่ประกันหมดอายุและภาษีหมดอายุ นับเป็น 2 รายการ (นับตามเอกสาร ไม่ใช่ตามคัน)
   * @param year ปี ค.ศ. สำหรับคำนวณค่าใช้จ่าย (default = ปีปัจจุบัน)
   */
  async getSummary(year?: number) {
    const targetYear = year ?? new Date().getFullYear();
    const cars = await this.findCarsWithDocuments();
    const matrix = this.buildMatrix(cars);

    const currentDocs = matrix.flatMap((row) =>
      DOC_TYPES.map((docType) => row[docType]).filter(
        (doc): doc is DocumentWithStatus => doc !== null,
      ),
    );

    // ค่าใช้จ่ายรวมทั้งปี นับทุกงวดที่ "ชำระ" ในปีนั้น ไม่ใช่แค่เอกสารปัจจุบัน
    const costAggregate = await this.maCarDocumentRepository.aggregate({
      _sum: { cost: true },
      where: {
        status: true,
        paidDate: {
          gte: new Date(targetYear, 0, 1),
          lt: new Date(targetYear + 1, 0, 1),
        },
      },
    } as Prisma.MaCarDocumentAggregateArgs);

    return {
      year: targetYear,
      expiredCount: currentDocs.filter((doc) => doc.level === 'expired').length,
      // ใกล้หมดอายุ <= 30 วัน (SLA เร่งด่วน)
      expiringSoonCount: currentDocs.filter((doc) => doc.level === 'warning')
        .length,
      // ใกล้หมดอายุ <= 60 วัน (นับรวมช่วง <= 30 ด้วย) — SLA เตือนล่วงหน้า 2 เดือน
      expiringSoon60Count: currentDocs.filter(
        (doc) =>
          doc.daysLeft !== null &&
          doc.daysLeft >= 0 &&
          doc.daysLeft <= SLA_SOON_DAYS,
      ).length,
      missingCount: matrix.reduce(
        (total, row) =>
          total + DOC_TYPES.filter((docType) => row[docType] === null).length,
        0,
      ),
      costThisYear: this.toNumber(costAggregate._sum?.cost ?? null) ?? 0,
      warningDays: WARNING_DAYS,
      slaSoonDays: SLA_SOON_DAYS,
    };
  }

  /**
   * ข้อมูลกราฟ 2 แท็บ
   * - upcoming: เอกสารที่จะครบกำหนดใน 12 เดือนข้างหน้า นับจากเดือนนี้ (ไม่ใช่ ม.ค.–ธ.ค.)
   *   เพราะงานต่ออายุที่ต้องเตรียมมักคาบเกี่ยวข้ามปี ถ้าตัดตามปีปฏิทิน
   *   พอถึงปลายปีกราฟจะว่างทั้งที่มีงานรออยู่เดือนหน้า
   * - budget: ค่าใช้จ่ายที่ชำระจริงรายเดือน — อันนี้ใช้ปีปฏิทินถูกแล้ว เพราะงบตัดเป็นรายปี
   * @param year ปี ค.ศ. ของกราฟงบประมาณ (default = ปีปัจจุบัน)
   */
  async getChart(year?: number) {
    const targetYear = year ?? new Date().getFullYear();
    const from = new Date(targetYear, 0, 1);
    const to = new Date(targetYear + 1, 0, 1);

    const cars = await this.findCarsWithDocuments();
    const matrix = this.buildMatrix(cars);

    // หน้าต่างแบบเลื่อน: เดือนนี้ ถึง เดือนเดียวกันของปีหน้า = 13 ช่อง
    // ต้องเป็น 13 ไม่ใช่ 12 เพราะเอกสารทุกใบมีอายุ 1 ปีพอดี
    // เอกสารที่ต่อวันนี้จะหมดอายุ "เดือนนี้ของปีหน้า" ซึ่งคือช่องสุดท้าย
    // ถ้าตัดที่ 12 ช่อง เอกสารที่เพิ่งต่อจะหล่นออกนอกกราฟทันที
    const UPCOMING_MONTHS = 12;
    const now = new Date();
    const upcoming = Array.from({ length: UPCOMING_MONTHS }, (_, offset) => {
      const bucket = new Date(now.getFullYear(), now.getMonth() + offset, 1);
      return {
        year: bucket.getFullYear(),
        month: bucket.getMonth() + 1,
        insurance: 0,
        act: 0,
        tax: 0,
        // รายการรถของเดือนนั้น เพื่อให้คลิกดูได้ว่าต้องต่อของคันไหนบ้าง
        // ไม่ใช่แค่ตัวเลข ซึ่งบอกได้แค่ "มี 3 คัน" แต่ไม่บอกว่าคันไหน
        items: [] as {
          carId: string;
          carName: string;
          licensePlate: string | null;
          docType: DocType;
          expireDate: Date;
          level: DocStatusLevel;
        }[],
      };
    });

    /** ตำแหน่ง bucket ของวันหมดอายุ (-1 = อยู่นอกหน้าต่าง) */
    const bucketIndex = (expire: Date): number => {
      const monthsAhead =
        (expire.getFullYear() - now.getFullYear()) * 12 +
        (expire.getMonth() - now.getMonth());
      return monthsAhead >= 0 && monthsAhead < UPCOMING_MONTHS ? monthsAhead : -1;
    };

    for (const row of matrix) {
      for (const docType of DOC_TYPES) {
        const doc = row[docType];
        if (!doc) continue;

        // เอกสารที่เลยกำหนดแล้วต้องไม่นับในกราฟนี้ — การ์ด "หมดอายุแล้ว" รายงานอยู่แล้ว
        // เช็คจาก level ไม่ใช่ offset ของเดือน เพราะใบที่หมดอายุต้นเดือนนี้จะได้ offset 0
        // แล้วถูกนับเป็น "กำลังจะครบกำหนด" ทั้งที่เลยกำหนดไปแล้ว
        if (doc.level === 'expired') continue;

        const index = bucketIndex(new Date(doc.expireDate));
        if (index === -1) continue;

        upcoming[index][docType] += 1;
        upcoming[index].items.push({
          carId: row.carId,
          carName: row.carName,
          licensePlate: row.licensePlate,
          docType,
          expireDate: doc.expireDate,
          level: doc.level,
        });
      }
    }

    // เรียงตามวันหมดอายุ ใบที่ต้องรีบทำก่อนจะอยู่บนสุดของแต่ละเดือน
    for (const bucket of upcoming) {
      bucket.items.sort(
        (a, b) =>
          new Date(a.expireDate).getTime() - new Date(b.expireDate).getTime(),
      );
    }

    const paidDocs = await this.maCarDocumentRepository.findMany({
      where: { status: true, paidDate: { gte: from, lt: to } },
      select: { paidDate: true, cost: true },
    } as Prisma.maCarDocumentFindManyArgs);

    const budget = Array.from({ length: 12 }, (_, month) => ({
      month: month + 1,
      amount: 0,
    }));

    for (const doc of paidDocs as any[]) {
      if (!doc.paidDate) continue;
      const month = new Date(doc.paidDate).getMonth();
      budget[month].amount += this.toNumber(doc.cost) ?? 0;
    }

    return { year: targetYear, upcoming, budget };
  }

  /**
   * ประวัติทุกงวดของรถ 1 คัน + เอกสาร 1 ประเภท
   * รวมแถวที่ถูกยกเลิก (status = false) ด้วย เพราะเป็นส่วนหนึ่งของประวัติ
   */
  async getHistory(carId: string, docType: string) {
    const documents = await this.maCarDocumentRepository.findMany({
      where: { carId, docType },
      orderBy: { expireDate: 'desc' },
      include: { maCarDocumentFile: true },
    } as Prisma.maCarDocumentFindManyArgs);

    return (documents as any[]).map((doc) => ({
      ...this.withStatus(doc),
      createdAt: doc.createdAt,
      createdByName: doc.createdByName,
      updatedAt: doc.updatedAt,
      updatedByName: doc.updatedByName,
    }));
  }

  /**
   * รายการเอกสารทั้งหมดแบบ flat สำหรับตาราง Log และ Export
   * - อิง createdAt (วันที่บันทึกเข้าระบบ) ทั้งการกรองช่วงเดือนและการเรียง ใหม่→เก่า
   * - ไม่กรอง status เพื่อให้แถวที่ยกเลิก (void) ขึ้นด้วย จะได้ตรวจสอบย้อนหลังได้
   * - join maCar เพราะ ma_car_document ไม่มี licensePlate (มีแต่ carName snapshot)
   * @param filters carId/docType กรองเฉพาะเจาะจง, startDate/endDate = ช่วง createdAt (gte/lt)
   *                skip/take = แบ่งหน้า — ตาราง Log ส่งมา, Export ไม่ส่ง take = ได้ทุกแถว
   * @returns { data, count } — count คือจำนวนทั้งหมดตาม filter (ก่อนแบ่งหน้า)
   */
  async getLog(filters: {
    carId?: string;
    docType?: string;
    startDate?: string;
    endDate?: string;
    skip?: number;
    take?: number;
  }) {
    const where: Prisma.maCarDocumentWhereInput = {};
    if (filters.carId) where.carId = filters.carId;
    if (filters.docType) where.docType = filters.docType;
    if (filters.startDate || filters.endDate) {
      where.createdAt = {
        ...(filters.startDate ? { gte: new Date(filters.startDate) } : {}),
        ...(filters.endDate ? { lt: new Date(filters.endDate) } : {}),
      };
    }

    // แบ่งหน้าเฉพาะเมื่อส่ง take มา — ถ้าไม่ส่ง (เช่น Export) ดึงทุกแถว
    const findArgs: Prisma.maCarDocumentFindManyArgs = {
      where,
      orderBy: { createdAt: 'desc' },
      include: {
        maCar: { select: { licensePlate: true, carName: true } },
      },
    };
    if (filters.take !== undefined) {
      findArgs.skip = filters.skip ?? 0;
      findArgs.take = filters.take;
    }

    const [documents, count] = await Promise.all([
      this.maCarDocumentRepository.findMany(findArgs),
      this.maCarDocumentRepository.count({ where }),
    ]);

    const data = (documents as any[]).map((doc) => ({
      ...this.withStatus(doc),
      carId: doc.carId,
      // ชื่อรถใช้ค่าจาก maCar ปัจจุบันก่อน ถ้าไม่มีค่อย fallback เป็น snapshot ตอนบันทึก
      carName: doc.maCar?.carName ?? doc.carName ?? '',
      licensePlate: doc.maCar?.licensePlate ?? null,
      createdAt: doc.createdAt,
      createdByName: doc.createdByName,
      updatedByName: doc.updatedByName,
    }));

    return { data, count };
  }

  /** สร้างเอกสารงวดใหม่ — ใช้ทั้งตอนเพิ่มครั้งแรกและตอนต่ออายุ (ต่ออายุ = insert ไม่ใช่ update) */
  create(data: Prisma.maCarDocumentCreateInput) {
    return this.maCarDocumentRepository.create({ data });
  }

  /** แก้ไขเอกสารงวดเดิม (กรณีกรอกผิด) — ไม่ใช่การต่ออายุ */
  update(documentId: string, data: Prisma.maCarDocumentUpdateInput) {
    return this.maCarDocumentRepository.update({
      where: { documentId },
      data: { ...data, updatedAt: new Date() },
    });
  }

  /**
   * ยกเลิกเอกสาร (soft-void) — ไม่ลบจริง
   * แถวที่ยกเลิกจะหายจาก matrix แต่ยังเห็นในประวัติ ทำให้ตามรอยย้อนหลังได้
   */
  void(documentId: string, updatedById?: string, updatedByName?: string) {
    return this.maCarDocumentRepository.update({
      where: { documentId },
      data: { status: false, updatedAt: new Date(), updatedById, updatedByName },
    });
  }

  /** ค่าที่เคยบันทึกไว้แล้ว ใช้เป็นตัวเลือกใน combobox เพื่อลดการพิมพ์ซ้ำตอนกรอกมือ */
  async getSuggestions() {
    const documents = await this.maCarDocumentRepository.findMany({
      select: { vender: true, insuranceType: true },
      distinct: ['vender', 'insuranceType'],
    } as Prisma.maCarDocumentFindManyArgs);

    const unique = (values: (string | null)[]) =>
      [...new Set(values.filter((value): value is string => !!value?.trim()))].sort();

    return {
      vender: unique((documents as any[]).map((doc) => doc.vender)),
      insuranceType: unique((documents as any[]).map((doc) => doc.insuranceType)),
    };
  }

  createFile(data: Prisma.maCarDocumentFileCreateInput) {
    return this.maCarDocumentFileRepository.create({ data });
  }

  /**
   * อัปโหลดไฟล์เอกสารขึ้น MinIO — key: macar/car/{carId}/document/{uuid}{ext}
   * เก็บ object key ที่ filePath, ชื่อเดิมที่ name (ไว้แสดง/ตั้งชื่อตอนดาวน์โหลด)
   */
  async uploadFiles(documentId: string, files: Express.Multer.File[]) {
    const document = await this.maCarDocumentRepository.findOne({
      where: { documentId },
    });
    const carId = document?.carId ?? 'unknown';
    const results = [];
    for (const file of files) {
      const ext = extname(file.originalname);
      const objectKey = `macar/car/${carId}/document/${uuidv4()}${ext}`;
      await this.minioService.uploadFile(
        file.buffer,
        file.size,
        config.minioBucket,
        objectKey,
      );
      const created = await this.maCarDocumentFileRepository.create({
        data: {
          documentId,
          name: file.originalname,
          fileName: objectKey.split('/').pop(),
          filePath: objectKey,
          fileType: ext,
        } as Prisma.maCarDocumentFileCreateInput,
      });
      results.push(created);
    }
    return results;
  }

  /** ลบไฟล์ — ลบ object ออกจาก MinIO ก่อน แล้วค่อยลบแถวใน DB */
  async removeFile(id: number) {
    const file = await this.maCarDocumentFileRepository.findOne({
      where: { id },
    });
    if (file?.filePath) {
      await this.minioService.deleteFile(file.filePath, config.minioBucket);
    }
    return this.maCarDocumentFileRepository.delete({ where: { id } });
  }
}
