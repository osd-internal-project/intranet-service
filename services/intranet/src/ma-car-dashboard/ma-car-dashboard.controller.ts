import { Controller, Get, Query } from '@nestjs/common';
import * as dayjs from 'dayjs';
import { MaCarDashboardService } from './ma-car-dashboard.service';

@Controller('ma-car-dashboard')
export class MaCarDashboardController {
  constructor(private readonly service: MaCarDashboardService) {}

  /**
   * ข้อมูลรวมแดชบอร์ด — ?from&to (ISO). ไม่ส่ง = เดือนปัจจุบัน
   */
  @Get('overview')
  getOverview(@Query('from') from?: string, @Query('to') to?: string) {
    const start = from ? new Date(from) : dayjs().startOf('month').toDate();
    // to เป็น exclusive — ถ้าส่งมาให้ +1 วันเพื่อคลุมทั้งวันสุดท้าย
    const end = to
      ? dayjs(to).add(1, 'day').startOf('day').toDate()
      : dayjs().endOf('month').add(1, 'millisecond').toDate();
    return this.service.getOverview(start, end);
  }

  /** แนวโน้มการจอง 12 เดือนย้อนหลัง */
  @Get('booking-trend')
  getBookingTrend() {
    return this.service.getBookingTrend();
  }
}
