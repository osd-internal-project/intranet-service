import { Injectable } from '@nestjs/common';
import {
  MaCarFuelTransactionRepository,
  MaCarRepository,
} from '@inventory/share';
import { Prisma } from '@prisma/client';
import { FuelTransactionExcelTemplate } from 'src/utils/generate-excel';
import {
  ReportFuelChartQueryDto,
  ReportFuelQueryDto,
} from './dto/report-fuel-query.dto';

/** Dropdown option for the car filter: { value: carId, label: carName }. */
export interface CarOption {
  readonly value: string;
  readonly label: string;
}

/** A single month bucket in the 6-month fuel-usage bar chart. */
export interface ChartBucket {
  readonly year: number;
  readonly month: number; // 1-12
  readonly label: string; // e.g. "ม.ค. 2026"
  amount: number;
}

/**
 * Fuel transaction joined with the car name and booking fields used by the
 * table/export. The shared repository's `findMany` does not propagate `include`
 * typing, so results are cast to this payload type at the call sites.
 */
type FuelTransactionWithRelations = Prisma.maCarFuelTransactionGetPayload<{
  include: {
    maCar: { select: { carName: true } };
    maCarBook: {
      select: {
        createdByName: true;
        recipientName: true;
        carBookStartDate: true;
        carBookEndDate: true;
      };
    };
  };
}>;

/** Thai short month names indexed 0-11. */
const THAI_SHORT_MONTHS = [
  'ม.ค.',
  'ก.พ.',
  'มี.ค.',
  'เม.ย.',
  'พ.ค.',
  'มิ.ย.',
  'ก.ค.',
  'ส.ค.',
  'ก.ย.',
  'ต.ค.',
  'พ.ย.',
  'ธ.ค.',
] as const;

/** Human-readable Thai labels per transaction type. */
const ACTION_STATUS_LABELS: Record<string, string> = {
  use: 'เติม',
  reset: 'รอบใหม่',
  adjust: 'แก้ไข',
};

@Injectable()
export class ReportFuelService {
  constructor(
    private readonly fuelTransactionRepo: MaCarFuelTransactionRepository,
    private readonly maCarRepo: MaCarRepository,
  ) {}

  /**
   * Build the shared Prisma `where` clause for table and export queries.
   * @param query Raw report filters from the request.
   * @returns Prisma where input for `maCarFuelTransaction`.
   */
  private buildWhere(
    query: ReportFuelQueryDto,
  ): Prisma.maCarFuelTransactionWhereInput {
    const { carId, startDate, endDate, actionStatus } = query || {};
    return {
      ...(carId && { carId }),
      ...(actionStatus && { actionStatus }),
      ...(startDate &&
        endDate && {
          date: {
            gte: this.startOfDate(startDate),
            lte: this.endOfDate(endDate),
          },
        }),
    };
  }

  /**
   * List active cars as dropdown options for the report filter.
   * @returns Array of { value: carId, label: carName }.
   */
  async getCarOptions(): Promise<CarOption[]> {
    const cars = await this.maCarRepo.findMany({
      where: { status: true },
      select: { carId: true, carName: true },
      orderBy: { carName: 'asc' },
    });
    return cars.map((car) => ({ value: car.carId, label: car.carName }));
  }

  /**
   * Paginated fuel-transaction table joined with car and booking info.
   * @param query Filters and pagination params.
   * @returns { data, count } where count is the total matching rows.
   */
  async findTable(query: ReportFuelQueryDto) {
    const where = this.buildWhere(query);
    const skip = Number(query?.skip) || 0;
    const take = Number(query?.take) || 10;

    const [rowsRaw, count] = await Promise.all([
      this.fuelTransactionRepo.findMany({
        where,
        include: {
          maCar: { select: { carName: true } },
          maCarBook: {
            select: {
              createdByName: true,
              recipientName: true,
              carBookStartDate: true,
              carBookEndDate: true,
            },
          },
        },
        orderBy: { date: 'desc' },
        skip,
        take,
      }),
      this.fuelTransactionRepo.count({ where }),
    ]);
    // Repository wrapper erases `include` typing; restore the joined shape.
    const rows = rowsRaw as unknown as FuelTransactionWithRelations[];

    const data = rows.map((row) => ({
      id: row.id,
      date: row.date,
      carId: row.carId,
      carName: row.maCar?.carName ?? '',
      amount: row.amount,
      remaining: row.remaining,
      actionStatus: row.actionStatus,
      actionStatusLabel: this.actionLabel(row.actionStatus),
      description: row.description,
      bookedBy: row.maCarBook?.createdByName ?? '',
      recipientName: row.maCarBook?.recipientName ?? '',
      carBookStartDate: row.maCarBook?.carBookStartDate ?? null,
      carBookEndDate: row.maCarBook?.carBookEndDate ?? null,
    }));

    return { data, count };
  }

  /**
   * Aggregate fuel-usage (`use`) amount per month over the requested range.
   * Falls back to the last 6 months when no range is supplied. Respects the
   * optional carId filter.
   * @param query Chart filter: carId and optional startDate/endDate month range.
   * @returns Month buckets in ascending chronological order.
   */
  async chart(query: ReportFuelChartQueryDto): Promise<ChartBucket[]> {
    const { carId, startDate, endDate } = query || {};
    const buckets =
      startDate && endDate
        ? this.buildMonthBuckets(new Date(startDate), new Date(endDate))
        : this.buildSixMonthBuckets();
    if (!buckets.length) return [];

    // Lower bound = first day of the first bucket; upper bound (exclusive) =
    // first day of the month after the last bucket, so the last month is fully
    // covered.
    const first = buckets[0];
    const last = buckets[buckets.length - 1];
    const from = new Date(first.year, first.month - 1, 1);
    const to = new Date(last.year, last.month, 1);

    const transactions = await this.fuelTransactionRepo.findMany({
      where: {
        actionStatus: 'use',
        date: { gte: from, lt: to },
        ...(carId && { carId }),
      },
      select: { amount: true, date: true },
    });

    for (const tx of transactions) {
      const txDate = new Date(tx.date);
      const bucket = buckets.find(
        (b) =>
          b.year === txDate.getFullYear() && b.month === txDate.getMonth() + 1,
      );
      if (bucket) {
        bucket.amount += Number(tx.amount);
      }
    }

    return buckets;
  }

  /**
   * Export the filtered fuel transactions to an Excel buffer.
   * @param query Same filters as the table (no pagination).
   * @returns xlsx file buffer.
   */
  async export(query: ReportFuelQueryDto) {
    const where = this.buildWhere(query);
    const rowsRaw = await this.fuelTransactionRepo.findMany({
      where,
      include: {
        maCar: { select: { carName: true } },
        maCarBook: {
          select: {
            createdByName: true,
            recipientName: true,
            carBookStartDate: true,
            carBookEndDate: true,
          },
        },
      },
      orderBy: { date: 'desc' },
    });
    // Repository wrapper erases `include` typing; restore the joined shape.
    const rows = rowsRaw as unknown as FuelTransactionWithRelations[];

    const transfer = rows.map((row, index) => ({
      'No.': index + 1,
      วันที่: this.formatDateTime(row.date),
      ชื่อรถ: row.maCar?.carName ?? '',
      จำนวนเงิน: Number(row.amount ?? 0),
      ยอดคงเหลือ: Number(row.remaining ?? 0),
      ประเภท: this.actionLabel(row.actionStatus),
      ผู้จอง: row.maCarBook?.createdByName ?? '',
      ผู้รับรถ: row.maCarBook?.recipientName ?? '',
      ช่วงวันจอง: this.bookingPeriod(
        row.maCarBook?.carBookStartDate,
        row.maCarBook?.carBookEndDate, 
      ),
      รายละเอียด: row.description,
    }));

    return await FuelTransactionExcelTemplate(transfer, 'report');
  }

  /**
   * Map a raw actionStatus code to its Thai label.
   * @param status Raw status: 'use' | 'reset' | 'adjust' | null.
   * @returns Thai label, or the original status if unknown.
   */
  private actionLabel(status?: string | null): string {
    if (!status) return '';
    return ACTION_STATUS_LABELS[status] ?? status;
  }

  /**
   * Format a booking date range as a
   * "dd/mm/yyyy HH:mm - dd/mm/yyyy HH:mm" string (24-hour).
   * @param start Booking start date.
   * @param end Booking end date.
   * @returns Formatted range, or '' when no booking dates exist.
   */
  private bookingPeriod(start?: Date | null, end?: Date | null): string {
    if (!start && !end) return '';
    return `${this.formatDateTime(start)} - ${this.formatDateTime(end)}`;
  }

  /**
   * Format a date as "dd/mm/yyyy HH:mm" (24-hour, en-GB).
   * @param date Date value (Date, ISO string, or nullish).
   * @returns Formatted date-time, or '' when no date is given.
   */
  private formatDateTime(date?: Date | string | null): string {
    if (!date) return '';
    return new Date(date).toLocaleString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });
  }

  /**
   * Build six zero-initialised month buckets ending with the current month.
   * @returns Buckets ordered oldest → newest.
   */
  private buildSixMonthBuckets(): ChartBucket[] {
    const now = new Date();
    return this.buildMonthBuckets(
      new Date(now.getFullYear(), now.getMonth() - 5, 1),
      now,
    );
  }

  /**
   * Build zero-initialised month buckets for every month in the inclusive
   * range [start, end] (compared by month, ignoring the day).
   * @param start Any date within the first month.
   * @param end Any date within the last month.
   * @returns Buckets ordered oldest → newest; empty when start is after end.
   */
  private buildMonthBuckets(start: Date, end: Date): ChartBucket[] {
    const buckets: ChartBucket[] = [];
    const cursor = new Date(start.getFullYear(), start.getMonth(), 1);
    const last = new Date(end.getFullYear(), end.getMonth(), 1);
    while (cursor <= last) {
      buckets.push({
        year: cursor.getFullYear(),
        month: cursor.getMonth() + 1,
        label: `${
          THAI_SHORT_MONTHS[cursor.getMonth()]
        } ${cursor.getFullYear()}`,
        amount: 0,
      });
      cursor.setMonth(cursor.getMonth() + 1);
    }
    return buckets;
  }

  /**
   * Start of day (00:00:00 UTC) for a given date string.
   * @param date Date string.
   * @returns Date at the start of the day.
   */
  startOfDate(date: string) {
    const dateset = new Date(date).setUTCHours(0, 0, 0, 0);
    return new Date(dateset);
  }

  /**
   * End of day (23:59:59 UTC) for a given date string.
   * @param date Date string.
   * @returns Date at the end of the day.
   */
  endOfDate(date: string) {
    const dateset = new Date(date).setUTCHours(23, 59, 59, 59);
    return new Date(dateset);
  }
}
