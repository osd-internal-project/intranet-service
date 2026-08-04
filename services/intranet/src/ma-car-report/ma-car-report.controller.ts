import { Controller, Get, Query } from '@nestjs/common';
import * as dayjs from 'dayjs';
import { MaCarReportService } from './ma-car-report.service';

@Controller('ma-car-report')
export class MaCarReportController {
  constructor(private readonly service: MaCarReportService) {}

  /**
   * สรุปค่าใช้จ่ายฟลีต — ?from&to (ISO). ไม่ส่ง = ปีปัจจุบัน
   */
  @Get('cost-summary')
  getCostSummary(@Query('from') from?: string, @Query('to') to?: string) {
    const start = from ? new Date(from) : dayjs().startOf('year').toDate();
    // to เป็น exclusive — ถ้าส่งมาให้ +1 วันเพื่อคลุมทั้งวันสุดท้าย
    const end = to
      ? dayjs(to).add(1, 'day').startOf('day').toDate()
      : dayjs().startOf('year').add(1, 'year').toDate();
    return this.service.getCostSummary(start, end);
  }

  /** แนวโน้มค่าใช้จ่ายรายเดือนแยกหมวด — ?year (ไม่ส่ง = ปีปัจจุบัน) */
  @Get('cost-trend')
  getCostTrend(@Query('year') year?: string) {
    return this.service.getCostTrend(this.parseYear(year));
  }

  /** วงเงินบัตรน้ำมัน vs การใช้จริง — ?year&month (ไม่ส่ง = เดือนปัจจุบัน) */
  @Get('fuel-budget')
  getFuelBudget(@Query('year') year?: string, @Query('month') month?: string) {
    const parsed = Number(month);
    const safeMonth =
      Number.isInteger(parsed) && parsed >= 1 && parsed <= 12
        ? parsed
        : dayjs().month() + 1;
    return this.service.getFuelBudget(this.parseYear(year), safeMonth);
  }

  /** ประมาณการค่าต่อเอกสาร 12 เดือนข้างหน้า */
  @Get('renewal-forecast')
  getRenewalForecast() {
    return this.service.getRenewalForecast();
  }

  /**
   * แปลงพารามิเตอร์ปีเป็นตัวเลข — ค่าที่ไม่ถูกต้องให้ตกกลับเป็นปีปัจจุบัน
   * @param year ค่าปีจาก query string
   */
  private parseYear(year?: string): number {
    const parsed = Number(year);
    return Number.isInteger(parsed) && parsed > 1900 ? parsed : dayjs().year();
  }
}
