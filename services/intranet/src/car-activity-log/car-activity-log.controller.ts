import { Controller, Get, Param, Query } from '@nestjs/common';
import { CarActivityLogService } from '@inventory/share';

@Controller('car-activity-log')
export class CarActivityLogController {
  constructor(private readonly service: CarActivityLogService) {}

  /**
   * ประวัติกิจกรรมของรถ 1 คัน แบบแบ่งหน้า — ไม่ส่ง take = คืนทุกแถว
   * @returns { data, count } ใหม่→เก่า
   */
  @Get('car/:carId')
  findByCar(
    @Param('carId') carId: string,
    @Query() query: { skip?: string; take?: string },
  ) {
    return this.service.findByCar(
      carId,
      query.skip !== undefined ? +query.skip : undefined,
      query.take !== undefined ? +query.take : undefined,
    );
  }
}
