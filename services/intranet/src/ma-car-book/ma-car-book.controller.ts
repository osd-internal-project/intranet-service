import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  Req,
  Query,
} from '@nestjs/common';
import { MaCarBookService } from './ma-car-book.service';
import { Prisma } from '@prisma/client';
import { ModuleTypes, UserInterceptor } from '@inventory/share';

@Controller('ma-car-book')
export class MaCarBookController {
  constructor(private readonly maCarBookService: MaCarBookService) {}

  @Post()
  create(@Body() data: Prisma.maCarBookCreateInput) {
    return this.maCarBookService.create(data);
  }

  @Get()
  findAll() {
    return this.maCarBookService.findAll();
  }

  @Get('findbytoken')
  @UseInterceptors(UserInterceptor)
  findBytoken(@Req() req) {
    const token = req.body.sub;
    return this.maCarBookService.findBytoken(token);
  }

  @Get('calendar')
  @UseInterceptors(UserInterceptor)
  findCalendarBytoken(@Req() req, @Query() query: { month: Date | string }) {
    const token = req.body.sub;
    return this.maCarBookService.findCalendarBytoken(token, query);
  }

  @Get('approve/:skip/:take')
  @UseInterceptors(UserInterceptor)
  findManyWithTakeSkipBuApprove(
    @Req() req,
    @Param('skip') skip: string,
    @Param('take') take: string,
    @Query()
    params: {
      carBookApprovedStatus?: string;
      carBookStartDate?: Date | string;
      createdByName?: string;
    },
  ) {
    console.log(skip);
    console.log(take);

    const token = req.body.sub;
    const module = ModuleTypes.INTRANET_APPROVE_BOOKING_CAR;
    return this.maCarBookService.findManyWithTakeSkip(
      params,
      token,
      module,
      +skip,
      +take,
    );
  }
  /** รถที่ว่างในช่วงเวลา (literal ต้องมาก่อน :id) */
  @Get('available')
  getAvailable(
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
  ) {
    return this.maCarBookService.getAvailable(startDate, endDate);
  }

  @Get('carId/:id')
  findByCarId(
    @Param('carId') carId: string,
    @Query() query: Prisma.maCarBookWhereInput,
  ) {
    return this.maCarBookService.findOne(carId, query);
  }

  /** รายการจองของรถ 1 คัน แบบแบ่งหน้า — ต้องมาก่อน :skip/:take และ :id */
  @Get('car/:carId')
  findManyByCarId(
    @Param('carId') carId: string,
    @Query() query: { skip?: string; take?: string },
  ) {
    return this.maCarBookService.findManyByCarId(
      carId,
      query.skip !== undefined ? +query.skip : undefined,
      query.take !== undefined ? +query.take : undefined,
    );
  }

  @Get('car-booking/:userId')
  findByUserId(@Param('userId') userId: string) {
    return this.maCarBookService.createdById(userId);
  }

  @Get(':skip/:take')
  @UseInterceptors(UserInterceptor)
  findManyWithTakeSkip(
    @Req() req,
    @Param('skip') skip: string,
    @Param('take') take: string,
    @Query()
    params: {
      carBookApprovedStatus?: string;
      carBookStartDate?: Date | string;
      createdByName?: string;
    },
  ) {
    const token = req.body.sub;
    const module = ModuleTypes.INTRANET;
    return this.maCarBookService.findManyWithTakeSkip(
      params,
      token,
      module,
      +skip,
      +take,
    );
  }

  @Get(':id/:skip/:take')
  id(
    @Param('id') id: string,
    @Param('skip') skip: string,
    @Param('take') take: string,
  ) {
    return this.maCarBookService.findManyId(id, +skip, +take);
  }

  @Get(':id')
  byId(@Param('id') id: string) {
    return this.maCarBookService.findManyAllId(id);
  }

  @Patch(':id')
  @UseInterceptors(UserInterceptor)
  update(@Req() req, @Param('id') id: string) {
    // UserInterceptor ยัด sub ลง body — ต้องแยกออกก่อนส่งให้ Prisma
    const { sub, ...data } = req.body;
    return this.maCarBookService.update(
      +id,
      data as Prisma.maCarBookUpdateInput,
      sub,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.maCarBookService.remove(+id);
  }
}
