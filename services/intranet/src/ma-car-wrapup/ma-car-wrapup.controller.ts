import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { MaCarWrapupService } from './ma-car-wrapup.service';
import { Prisma } from '@prisma/client';

@Controller('ma-car-wrapup')
export class MaCarWrapupController {
  constructor(private readonly maCarWrapupService: MaCarWrapupService) {}

  @Post()
  create(@Body() data: Prisma.maCarWrapupCreateInput) {
    return this.maCarWrapupService.create(data);
  }

  @Get()
  findAll(@Query() query) {
    return this.maCarWrapupService.findAll(query);
  }

  /** ประวัติตรวจสภาพของรถ 1 คัน แบบแบ่งหน้า — ต้องมาก่อน :carWrapupId */
  @Get('car/:carId')
  findManyByCarId(
    @Param('carId') carId: string,
    @Query() query: { skip?: string; take?: string },
  ) {
    return this.maCarWrapupService.findManyByCarId(
      carId,
      query.skip !== undefined ? +query.skip : undefined,
      query.take !== undefined ? +query.take : undefined,
    );
  }

  @Get(':carWrapupId')
  findOne(@Param('carWrapupId') carWrapupId: string) {
    return this.maCarWrapupService.findOne(carWrapupId);
  }

  @Patch(':carWrapupId')
  update(
    @Param('carWrapupId') carWrapupId: string,
    @Body() condition: Prisma.maCarWrapupUpdateArgs,
  ) {
    return this.maCarWrapupService.update(carWrapupId, condition);
  }

  @Delete(':carWrapupId')
  remove(@Param('carWrapupId') carWrapupId: string) {
    return this.maCarWrapupService.remove(carWrapupId);
  }
}
