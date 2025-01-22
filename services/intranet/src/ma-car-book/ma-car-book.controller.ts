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
  findBytoken(@Req() req) {
    const token = req.body.sub;
    return this.maCarBookService.findBytoken(token);
  }

  @Get('approve/:skip/:take')
  findManyWithTakeSkipBuApprove(
    @Req() req,
    @Param('skip') skip: string,
    @Param('take') take: string,
  ) {
    const token = req.body.sub;
    const module = ModuleTypes.INTRANET_APPROVE_BOOKING_CAR;
    return this.maCarBookService.findManyWithTakeSkip(
      token,
      module,
      +skip,
      +take,
    );
  }
  @Get('carId/:carId')
  findOne(@Param('carId') carId: string) {
    return this.maCarBookService.findOne(carId);
  }

  @Get(':skip/:take')
  findManyWithTakeSkip(
    @Req() req,
    @Param('skip') skip: string,
    @Param('take') take: string,
  ) {
    const token = req.body.sub;
    const module = ModuleTypes.INTRANET;
    return this.maCarBookService.findManyWithTakeSkip(
      token,
      module,
      +skip,
      +take,
    );
  }

  @Get(':createdById')
  findByUserId(@Param('createdById') createdById: string) {
    return this.maCarBookService.createdById(createdById);
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
