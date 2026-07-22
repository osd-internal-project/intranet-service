import { Injectable } from '@nestjs/common';
import {
  MaCarRepository,
  MaCarBookRepository,
  MaCarFuelTransactionRepository,
  MaCarWrapupRepository,
  MaCarDocumentRepository,
} from '@inventory/share';
import * as dayjs from 'dayjs';

/** สถานะการจองที่ถือว่า "ใช้รถจริง" — ใช้กับ ranking/utilization */
const USAGE_STATUSES = ['Approve', 'Completed', 'Return'];

/** จำนวนวันล่วงหน้าที่ถือว่าเอกสารใกล้หมดอายุ (KPI) */
const DOC_SOON_DAYS = 60;

/** number จาก Prisma.Decimal/Money (null-safe) */
const toNum = (v: any): number => (v == null ? 0 : Number(v));

/** จำนวนวันที่ถือครองรถของการจอง 1 รายการ (อย่างน้อย 1 วัน) */
const bookingDays = (b: any): number => {
  if (!b.carBookStartDate || !b.carBookEndDate) return 1;
  const d = dayjs(b.carBookEndDate)
    .startOf('day')
    .diff(dayjs(b.carBookStartDate).startOf('day'), 'day');
  return Math.max(1, d + 1);
};

@Injectable()
export class MaCarDashboardService {
  constructor(
    private readonly carRepo: MaCarRepository,
    private readonly bookRepo: MaCarBookRepository,
    private readonly fuelRepo: MaCarFuelTransactionRepository,
    private readonly wrapupRepo: MaCarWrapupRepository,
    private readonly docRepo: MaCarDocumentRepository,
  ) {}

  /**
   * ข้อมูลรวมของแดชบอร์ดฟลีตในช่วงเวลาที่เลือก
   * @param from เริ่มช่วง (inclusive)
   * @param to สิ้นสุดช่วง (exclusive)
   */
  async getOverview(from: Date, to: Date) {
    const rangeDays = Math.max(
      1,
      dayjs(to).startOf('day').diff(dayjs(from).startOf('day'), 'day'),
    );

    // ---- ดึงข้อมูลในช่วง (query ครั้งเดียวต่อโดเมน) ----
    const [cars, bookings, fuelTx, wrapups] = await Promise.all([
      this.carRepo.findMany({ orderBy: { carName: 'asc' } }),
      this.bookRepo.findMany({
        where: { carBookStartDate: { gte: from, lt: to } },
      }),
      this.fuelRepo.findMany({
        where: { date: { gte: from, lt: to }, actionStatus: 'use' },
      }),
      this.wrapupRepo.findMany({
        where: { dateStart: { gte: from, lt: to } },
      }),
    ]);

    const activeCars = cars.filter((c: any) => c.status !== false);
    const usage = bookings.filter((b: any) =>
      USAGE_STATUSES.includes(b.carBookApprovedStatus),
    );

    // ---- แผนที่ค่าใช้จ่ายต่อคัน ----
    const fuelByCar = new Map<string, number>();
    for (const t of fuelTx as any[]) {
      fuelByCar.set(t.carId, (fuelByCar.get(t.carId) ?? 0) + toNum(t.amount));
    }
    const maintByCar = new Map<string, number>();
    for (const w of wrapups as any[]) {
      if (!w.carId) continue;
      maintByCar.set(w.carId, (maintByCar.get(w.carId) ?? 0) + toNum(w.cost));
    }

    // ---- อันดับผู้จอง (A) ----
    const bookerMap = new Map<
      string,
      { userId: string; name: string; count: number; days: number }
    >();
    for (const b of usage as any[]) {
      const key = b.createdById || b.createdByName || 'unknown';
      const cur =
        bookerMap.get(key) ??
        {
          userId: b.createdById ?? '',
          name: b.createdByName || 'ไม่ระบุ',
          count: 0,
          days: 0,
        };
      cur.count += 1;
      cur.days += bookingDays(b);
      bookerMap.set(key, cur);
    }
    const topBookers = [...bookerMap.values()]
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);

    // ---- รถที่ถูกใช้มากที่สุด (B) + สรุปรายคัน (E) ----
    const carUsage = new Map<string, { count: number; days: number }>();
    for (const b of usage as any[]) {
      const cur = carUsage.get(b.carId) ?? { count: 0, days: 0 };
      cur.count += 1;
      cur.days += bookingDays(b);
      carUsage.set(b.carId, cur);
    }
    const carName = new Map<string, string>(
      cars.map((c: any) => [c.carId, c.carName]),
    );
    const topVehicles = [...carUsage.entries()]
      .map(([carId, v]) => ({
        carId,
        carName: carName.get(carId) ?? carId,
        count: v.count,
        days: v.days,
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);

    const perVehicle = activeCars
      .map((c: any) => {
        const u = carUsage.get(c.carId) ?? { count: 0, days: 0 };
        return {
          carId: c.carId,
          carName: c.carName,
          licensePlate: c.licensePlate ?? null,
          bookings: u.count,
          days: u.days,
          utilization: Math.min(100, Math.round((u.days / rangeDays) * 100)),
          fuelCost: Math.round(fuelByCar.get(c.carId) ?? 0),
          maintenanceCost: Math.round(maintByCar.get(c.carId) ?? 0),
        };
      })
      .sort((a, b) => b.bookings - a.bookings);

    // ---- สถานะการจอง (D) ----
    const statusMap = new Map<string, number>();
    for (const b of bookings as any[]) {
      const s = b.carBookApprovedStatus || 'Process';
      statusMap.set(s, (statusMap.get(s) ?? 0) + 1);
    }
    const statusBreakdown = [...statusMap.entries()].map(([status, count]) => ({
      status,
      count,
    }));

    // ---- จุดหมายปลายทาง (F) ----
    const destMap = new Map<string, number>();
    for (const b of usage as any[]) {
      const place = (b.carBookProvince || b.carBookPlace || '').trim();
      if (!place) continue;
      destMap.set(place, (destMap.get(place) ?? 0) + 1);
    }
    const destinations = [...destMap.entries()]
      .map(([place, count]) => ({ place, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 8);

    // ---- องค์ประกอบฟลีต (G) ----
    const compMap = new Map<string, number>();
    for (const c of activeCars as any[]) {
      const key = (c.carType || c.carCategory || 'อื่น ๆ').trim() || 'อื่น ๆ';
      compMap.set(key, (compMap.get(key) ?? 0) + 1);
    }
    const fleetComposition = [...compMap.entries()].map(([type, count]) => ({
      type,
      count,
    }));

    // ---- เอกสารใกล้หมดอายุ (H / KPI) ----
    const now = new Date();
    const soon = dayjs(now).add(DOC_SOON_DAYS, 'day').toDate();
    const expiringDocs = await this.docRepo.findMany({
      where: { status: true, expireDate: { gte: now, lte: soon } },
      orderBy: { expireDate: 'asc' },
    });
    const docExpiry = (expiringDocs as any[]).slice(0, 20).map((d) => ({
      documentId: d.documentId,
      carId: d.carId,
      carName: d.carName,
      docType: d.docType,
      expireDate: d.expireDate,
    }));

    // ---- KPI ----
    const approvedCount = usage.length;
    const distinctUsedCars = new Set(usage.map((b: any) => b.carId)).size;
    const fuelSpend = [...fuelByCar.values()].reduce((a, b) => a + b, 0);
    const maintenanceSpend = [...maintByCar.values()].reduce((a, b) => a + b, 0);

    const kpis = {
      totalBookings: bookings.length,
      approvedRate: bookings.length
        ? Math.round((approvedCount / bookings.length) * 100)
        : 0,
      utilization: activeCars.length
        ? Math.round((distinctUsedCars / activeCars.length) * 100)
        : 0,
      activeCars: activeCars.length,
      fuelSpend: Math.round(fuelSpend),
      maintenanceSpend: Math.round(maintenanceSpend),
      docExpiringSoon: expiringDocs.length,
    };

    return {
      kpis,
      topBookers,
      topVehicles,
      perVehicle,
      statusBreakdown,
      destinations,
      fleetComposition,
      docExpiry,
    };
  }

  /**
   * แนวโน้มการจอง 12 เดือนย้อนหลัง (นับตาม carBookStartDate)
   * @returns [{ label: 'MM/YYYY', count }]
   */
  async getBookingTrend() {
    const start = dayjs().startOf('month').subtract(11, 'month');
    const bookings = await this.bookRepo.findMany({
      where: { carBookStartDate: { gte: start.toDate() } },
    });

    const buckets: { key: string; label: string; count: number }[] = [];
    for (let i = 0; i < 12; i++) {
      const m = start.add(i, 'month');
      buckets.push({ key: m.format('YYYY-MM'), label: m.format('MM/YYYY'), count: 0 });
    }
    const idx = new Map(buckets.map((b, i) => [b.key, i]));
    for (const b of bookings as any[]) {
      if (!b.carBookStartDate) continue;
      const key = dayjs(b.carBookStartDate).format('YYYY-MM');
      const i = idx.get(key);
      if (i !== undefined) buckets[i].count += 1;
    }
    return buckets.map(({ label, count }) => ({ label, count }));
  }
}
