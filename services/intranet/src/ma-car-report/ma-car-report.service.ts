import { Injectable } from '@nestjs/common';
import {
  MaCarRepository,
  MaCarBookRepository,
  MaCarFuelTransactionRepository,
  MaCarWrapupRepository,
  MaCarDocumentRepository,
} from '@inventory/share';
import * as dayjs from 'dayjs';
import { DOC_TYPES, DocType } from '../ma-car-document/ma-car-document.status';

/** สถานะการจองที่ถือว่า "ใช้รถจริง" — ใช้นับวันใช้งานเพื่อหารเป็นค่าใช้จ่ายต่อวัน */
const USAGE_STATUSES = ['Approve', 'Completed', 'Return'];

/** number จาก Prisma.Decimal/Money (null-safe) — maCarWrapup.cost เป็น @db.Money ต้องแปลงเสมอ */
const toNum = (v: any): number => (v == null ? 0 : Number(v));

/** จำนวนวันที่ถือครองรถของการจอง 1 รายการ (อย่างน้อย 1 วัน) */
const bookingDays = (b: any): number => {
  if (!b.carBookStartDate || !b.carBookEndDate) return 1;
  const d = dayjs(b.carBookEndDate)
    .startOf('day')
    .diff(dayjs(b.carBookStartDate).startOf('day'), 'day');
  return Math.max(1, d + 1);
};

/**
 * วันที่ใช้ตัดค่าใช้จ่ายของเอกสาร (เกณฑ์เงินสด)
 * ยึด paidDate เป็นหลักให้ตรงกับกราฟงบประมาณเดิมใน ma-car-document.service.getChart()
 * ถ้าไม่มี paidDate ใช้ startDate แทน แล้วนับแยกไว้ให้บัญชีเห็นว่ามีรายการกำกวมกี่รายการ
 */
const docCostDate = (d: any): Date | null => d.paidDate ?? d.startDate ?? null;

/** หมวดค่าใช้จ่ายของฟลีต — ลำดับนี้ใช้ทั้งใน breakdown, trend และตาราง TCO */
export type CostCategory = 'fuel' | 'maintenance' | 'insurance' | 'act' | 'tax';

/** ยอดค่าใช้จ่ายแยกหมวด (ใช้ซ้ำทั้งระดับฟลีตและระดับรายคัน) */
interface CostBucket {
  fuel: number;
  maintenance: number;
  insurance: number;
  act: number;
  tax: number;
}

/** ค่าเริ่มต้นของถังค่าใช้จ่าย */
const emptyBucket = (): CostBucket => ({
  fuel: 0,
  maintenance: 0,
  insurance: 0,
  act: 0,
  tax: 0,
});

/** ผลรวมทุกหมวดในถังเดียว */
const bucketTotal = (b: CostBucket): number =>
  b.fuel + b.maintenance + b.insurance + b.act + b.tax;

@Injectable()
export class MaCarReportService {
  constructor(
    private readonly carRepo: MaCarRepository,
    private readonly bookRepo: MaCarBookRepository,
    private readonly fuelRepo: MaCarFuelTransactionRepository,
    private readonly wrapupRepo: MaCarWrapupRepository,
    private readonly docRepo: MaCarDocumentRepository,
  ) {}

  /**
   * ดึงข้อมูลค่าใช้จ่ายดิบทุกโดเมนในช่วงเวลาเดียว (query ครั้งเดียวต่อโดเมน)
   * @param from เริ่มช่วง (inclusive)
   * @param to สิ้นสุดช่วง (exclusive)
   */
  private async collectCosts(from: Date, to: Date) {
    return Promise.all([
      this.fuelRepo.findMany({
        where: { date: { gte: from, lt: to }, actionStatus: 'use' },
      }),
      this.wrapupRepo.findMany({ where: { dateStart: { gte: from, lt: to } } }),
      // เอกสารตัดตาม paidDate; รายการที่ยังไม่ระบุ paidDate ใช้ startDate แทน
      this.docRepo.findMany({
        where: {
          status: true,
          OR: [
            { paidDate: { gte: from, lt: to } },
            { AND: [{ paidDate: null }, { startDate: { gte: from, lt: to } }] },
          ],
        },
      }),
    ]);
  }

  /**
   * รวมค่าใช้จ่ายดิบเป็นถังรวมฟลีต + ถังแยกรายคัน
   * @returns total = ยอดรวมทั้งฟลีต, byCar = Map carId -> ถังค่าใช้จ่าย
   */
  private aggregate(fuelTx: any[], wrapups: any[], docs: any[]) {
    const total = emptyBucket();
    const byCar = new Map<string, CostBucket>();
    const repairCountByCar = new Map<string, number>();

    /** หยิบถังของรถคันนั้น (สร้างใหม่ถ้ายังไม่มี) */
    const bucketOf = (carId: string): CostBucket => {
      const cur = byCar.get(carId) ?? emptyBucket();
      byCar.set(carId, cur);
      return cur;
    };

    for (const t of fuelTx) {
      const amount = toNum(t.amount);
      total.fuel += amount;
      if (t.carId) bucketOf(t.carId).fuel += amount;
    }

    for (const w of wrapups) {
      const cost = toNum(w.cost);
      total.maintenance += cost;
      if (!w.carId) continue;
      bucketOf(w.carId).maintenance += cost;
      repairCountByCar.set(w.carId, (repairCountByCar.get(w.carId) ?? 0) + 1);
    }

    for (const d of docs) {
      const type = d.docType as DocType;
      // docType นอกเหนือ 3 ประเภทที่รู้จัก ไม่นับเข้ายอด เพื่อไม่ให้ยอดรวมเพี้ยนแบบเงียบ ๆ
      if (!DOC_TYPES.includes(type)) continue;
      const cost = toNum(d.cost);
      total[type] += cost;
      if (d.carId) bucketOf(d.carId)[type] += cost;
    }

    return { total, byCar, repairCountByCar };
  }

  /**
   * สรุปค่าใช้จ่ายฟลีตในช่วงเวลา + เทียบกับช่วงก่อนหน้าที่ยาวเท่ากัน
   * @param from เริ่มช่วง (inclusive)
   * @param to สิ้นสุดช่วง (exclusive)
   */
  async getCostSummary(from: Date, to: Date) {
    const rangeMs = to.getTime() - from.getTime();
    const prevFrom = new Date(from.getTime() - rangeMs);

    const [cars, bookings, current, previous] = await Promise.all([
      this.carRepo.findMany({ orderBy: { carName: 'asc' } }),
      this.bookRepo.findMany({
        where: { carBookStartDate: { gte: from, lt: to } },
      }),
      this.collectCosts(from, to),
      this.collectCosts(prevFrom, from),
    ]);

    const [fuelTx, wrapups, docs] = current;
    const { total, byCar, repairCountByCar } = this.aggregate(
      fuelTx as any[],
      wrapups as any[],
      docs as any[],
    );
    const prev = this.aggregate(
      previous[0] as any[],
      previous[1] as any[],
      previous[2] as any[],
    );

    const activeCars = (cars as any[]).filter((c) => c.status !== false);

    // ---- วันใช้งานจริงต่อคัน (ตัวหารของค่าใช้จ่าย/วัน) ----
    const usageDaysByCar = new Map<string, number>();
    for (const b of bookings as any[]) {
      if (!USAGE_STATUSES.includes(b.carBookApprovedStatus)) continue;
      usageDaysByCar.set(
        b.carId,
        (usageDaysByCar.get(b.carId) ?? 0) + bookingDays(b),
      );
    }

    // ---- ตาราง TCO รายคัน ----
    const perVehicle = activeCars
      .map((c) => {
        const bucket = byCar.get(c.carId) ?? emptyBucket();
        const totalCost = bucketTotal(bucket);
        const usageDays = usageDaysByCar.get(c.carId) ?? 0;
        return {
          carId: c.carId,
          carName: c.carName,
          licensePlate: c.licensePlate ?? null,
          carType: c.carType ?? c.carCategory ?? null,
          fuel: Math.round(bucket.fuel),
          maintenance: Math.round(bucket.maintenance),
          insurance: Math.round(bucket.insurance),
          act: Math.round(bucket.act),
          tax: Math.round(bucket.tax),
          total: Math.round(totalCost),
          repairCount: repairCountByCar.get(c.carId) ?? 0,
          usageDays,
          // ไม่มีเลขไมล์ตอนเติมน้ำมัน จึงคิดต่อ "วันใช้งาน" แทนต่อกิโลเมตร
          costPerUsageDay: usageDays ? Math.round(totalCost / usageDays) : 0,
        };
      })
      .sort((a, b) => b.total - a.total);

    // ---- การกระจุกตัวของค่าใช้จ่าย ----
    const topVehicles = perVehicle
      .filter((v) => v.total > 0)
      .slice(0, 10)
      .map((v) => ({ carId: v.carId, carName: v.carName, total: v.total }));

    const vendorMap = new Map<string, { amount: number; count: number }>();
    for (const w of wrapups as any[]) {
      const name = (w.vender || '').trim();
      if (!name) continue;
      const cur = vendorMap.get(name) ?? { amount: 0, count: 0 };
      cur.amount += toNum(w.cost);
      cur.count += 1;
      vendorMap.set(name, cur);
    }
    const topVendors = [...vendorMap.entries()]
      .map(([vender, v]) => ({
        vender,
        amount: Math.round(v.amount),
        count: v.count,
      }))
      .sort((a, b) => b.amount - a.amount)
      .slice(0, 10);

    // ---- KPI ----
    const months = Math.max(1, dayjs(to).diff(dayjs(from), 'month', true));
    const grandTotal = bucketTotal(total);
    const kpis = {
      total: Math.round(grandTotal),
      fuel: Math.round(total.fuel),
      maintenance: Math.round(total.maintenance),
      insuranceAct: Math.round(total.insurance + total.act),
      tax: Math.round(total.tax),
      avgPerCarPerMonth: activeCars.length
        ? Math.round(grandTotal / activeCars.length / months)
        : 0,
    };

    const prevGrandTotal = bucketTotal(prev.total);
    const previousKpis = {
      total: Math.round(prevGrandTotal),
      fuel: Math.round(prev.total.fuel),
      maintenance: Math.round(prev.total.maintenance),
      insuranceAct: Math.round(prev.total.insurance + prev.total.act),
      tax: Math.round(prev.total.tax),
      avgPerCarPerMonth: activeCars.length
        ? Math.round(prevGrandTotal / activeCars.length / months)
        : 0,
    };

    const breakdown: { category: CostCategory; amount: number }[] = [
      { category: 'fuel', amount: Math.round(total.fuel) },
      { category: 'maintenance', amount: Math.round(total.maintenance) },
      { category: 'insurance', amount: Math.round(total.insurance) },
      { category: 'act', amount: Math.round(total.act) },
      { category: 'tax', amount: Math.round(total.tax) },
    ];

    return {
      kpis,
      previousKpis,
      breakdown,
      perVehicle,
      topVehicles,
      topVendors,
      activeCars: activeCars.length,
      // จำนวนเอกสารที่ไม่มี paidDate — ตัดยอดด้วย startDate แทน บัญชีควรรู้ว่ามีกี่รายการ
      docsWithoutPaidDate: (docs as any[]).filter((d) => !d.paidDate).length,
    };
  }

  /**
   * แนวโน้มค่าใช้จ่ายรายเดือนแยกหมวด ตลอดปีที่เลือก
   * @param year ปี ค.ศ.
   */
  async getCostTrend(year: number) {
    const start = dayjs(`${year}-01-01`).startOf('year');
    const end = start.add(1, 'year');
    const [fuelTx, wrapups, docs] = await this.collectCosts(
      start.toDate(),
      end.toDate(),
    );

    const buckets = Array.from({ length: 12 }, (_, i) => ({
      label: start.add(i, 'month').format('MM/YYYY'),
      ...emptyBucket(),
      total: 0,
    }));

    /** index ของเดือนในปีที่เลือก (null = อยู่นอกปี/ไม่มีวันที่) */
    const monthIndex = (d?: Date | string | null): number | null => {
      if (!d) return null;
      const m = dayjs(d);
      return m.year() === year ? m.month() : null;
    };

    for (const t of fuelTx as any[]) {
      const i = monthIndex(t.date);
      if (i !== null) buckets[i].fuel += toNum(t.amount);
    }
    for (const w of wrapups as any[]) {
      const i = monthIndex(w.dateStart);
      if (i !== null) buckets[i].maintenance += toNum(w.cost);
    }
    for (const d of docs as any[]) {
      const type = d.docType as DocType;
      if (!DOC_TYPES.includes(type)) continue;
      const i = monthIndex(docCostDate(d));
      if (i !== null) buckets[i][type] += toNum(d.cost);
    }

    return buckets.map((b) => ({
      label: b.label,
      fuel: Math.round(b.fuel),
      maintenance: Math.round(b.maintenance),
      insurance: Math.round(b.insurance),
      act: Math.round(b.act),
      tax: Math.round(b.tax),
      total: Math.round(bucketTotal(b)),
    }));
  }

  /**
   * เปรียบเทียบวงเงินบัตรน้ำมันกับการใช้จริงรายคัน ในเดือนที่เลือก
   * ใช้ยอดจาก transaction เสมอ ไม่อ่าน fuelMonthlyRemaining เพราะเป็นตัวนับสด ๆ ที่ cron รีเซ็ตทุกเดือน
   * @param year ปี ค.ศ.
   * @param month เดือน 1-12
   */
  async getFuelBudget(year: number, month: number) {
    const start = dayjs(`${year}-01-01`).startOf('year').add(month - 1, 'month');
    const end = start.add(1, 'month');

    const [cars, fuelTx] = await Promise.all([
      this.carRepo.findMany({ orderBy: { carName: 'asc' } }),
      this.fuelRepo.findMany({
        where: {
          date: { gte: start.toDate(), lt: end.toDate() },
          actionStatus: 'use',
        },
      }),
    ]);

    const actualByCar = new Map<string, number>();
    for (const t of fuelTx as any[]) {
      if (!t.carId) continue;
      actualByCar.set(t.carId, (actualByCar.get(t.carId) ?? 0) + toNum(t.amount));
    }

    const activeCars = (cars as any[]).filter((c) => c.status !== false);
    // รถที่ไม่มีบัตรน้ำมันหรือไม่ได้ตั้งวงเงิน เทียบงบไม่ได้ — แยกออกแล้วรายงานเป็นจำนวน
    const budgeted = activeCars.filter(
      (c) => c.fuelCardStatus === 'active' && toNum(c.fuelMonthlyLimit) > 0,
    );

    const rows = budgeted
      .map((c) => {
        const limit = Math.round(toNum(c.fuelMonthlyLimit));
        const actual = Math.round(actualByCar.get(c.carId) ?? 0);
        return {
          carId: c.carId,
          carName: c.carName,
          licensePlate: c.licensePlate ?? null,
          limit,
          actual,
          // variance > 0 = ใช้เกินวงเงิน
          variance: actual - limit,
          overBudget: actual > limit,
          usedPercent: limit ? Math.round((actual / limit) * 100) : 0,
        };
      })
      .sort((a, b) => b.variance - a.variance);

    return {
      year,
      month,
      rows,
      excludedCount: activeCars.length - budgeted.length,
      totalLimit: rows.reduce((s, r) => s + r.limit, 0),
      totalActual: rows.reduce((s, r) => s + r.actual, 0),
      overBudgetCount: rows.filter((r) => r.overBudget).length,
    };
  }

  /**
   * ประมาณการค่าต่อเอกสาร 12 เดือนข้างหน้า
   * ใช้เบี้ย/ค่าธรรมเนียมของงวดล่าสุดเป็นตัวประมาณของงวดถัดไป
   */
  async getRenewalForecast() {
    const [cars, docs] = await Promise.all([
      this.carRepo.findMany({ orderBy: { carName: 'asc' } }),
      this.docRepo.findMany({
        where: { status: true },
        orderBy: { expireDate: 'asc' },
      }),
    ]);

    const activeCars = (cars as any[]).filter((c) => c.status !== false);
    const activeCarIds = new Set(activeCars.map((c) => c.carId));

    // งวดปัจจุบันของแต่ละ (รถ, ประเภทเอกสาร) = แถวที่ expireDate มากที่สุด
    // (renew เป็นการ insert แถวใหม่ ไม่ได้ update ทับ)
    const currentDoc = new Map<string, any>();
    for (const d of docs as any[]) {
      if (!activeCarIds.has(d.carId)) continue;
      const key = `${d.carId}::${d.docType}`;
      const cur = currentDoc.get(key);
      if (!cur || dayjs(d.expireDate).isAfter(dayjs(cur.expireDate))) {
        currentDoc.set(key, d);
      }
    }

    const start = dayjs().startOf('month');
    const end = start.add(12, 'month');
    const months = Array.from({ length: 12 }, (_, i) => ({
      label: start.add(i, 'month').format('MM/YYYY'),
      insurance: 0,
      act: 0,
      tax: 0,
      total: 0,
    }));

    const carName = new Map<string, string>(
      activeCars.map((c) => [c.carId, c.carName]),
    );
    const items: any[] = [];
    const missing: { carId: string; carName: string; docType: DocType }[] = [];

    for (const car of activeCars) {
      for (const docType of DOC_TYPES) {
        const doc = currentDoc.get(`${car.carId}::${docType}`);
        if (!doc) {
          missing.push({ carId: car.carId, carName: car.carName, docType });
          continue;
        }
        const expire = dayjs(doc.expireDate);
        // นับเฉพาะงวดที่ครบกำหนดภายในหน้าต่าง 12 เดือน (รวมที่เลยกำหนดมาแล้วไว้ในเดือนแรก)
        if (expire.isAfter(end)) continue;
        const idx = expire.isBefore(start)
          ? 0
          : expire.diff(start, 'month');
        const amount = Math.round(toNum(doc.cost));
        months[idx][docType] += amount;
        months[idx].total += amount;
        items.push({
          carId: car.carId,
          carName: carName.get(car.carId) ?? car.carId,
          licensePlate: car.licensePlate ?? null,
          docType,
          expireDate: doc.expireDate,
          lastCost: amount,
          vender: doc.vender ?? null,
          overdue: expire.isBefore(dayjs().startOf('day')),
        });
      }
    }

    items.sort(
      (a, b) => dayjs(a.expireDate).valueOf() - dayjs(b.expireDate).valueOf(),
    );

    return {
      months,
      items,
      missing,
      grandTotal: items.reduce((s, i) => s + i.lastCost, 0),
    };
  }
}
