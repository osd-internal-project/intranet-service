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
  @Get('carId/:carId')
  findOne(
    @Param('carId') carId: string,
    @Query() query: Prisma.maCarBookWhereInput,
  ) {
    return this.maCarBookService.findOne(carId, query);
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
  update(@Param('id') id: string, @Body() data: Prisma.maCarBookUpdateInput) {
    return this.maCarBookService.update(+id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.maCarBookService.remove(+id);
  }
}
