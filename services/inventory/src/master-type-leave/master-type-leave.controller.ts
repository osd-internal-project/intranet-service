import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Delete,
  Param,
} from '@nestjs/common';
import { MasterTypeLeaveService } from './master-type-leave.service';
import { Prisma } from '@prisma/client';
@Controller('master-type-leave')
export class MasterTypeLeaveController {
  constructor(
    private readonly mastertypeleaveService: MasterTypeLeaveService,
  ) {}

  @Get()
  findAll() {
    return this.mastertypeleaveService.findAll();
  }

  @Post()
  create(@Body('data') data: Prisma.masterTypeleaveCreateInput) {
    return this.mastertypeleaveService.create(data);
  }

  @Post('condition')
  findByCondition(
    @Body('condition') condition: Prisma.masterTypeleaveFindManyArgs,
  ) {
    return this.mastertypeleaveService.findByCondition(condition);
  }

  @Post('condition-first')
  findOneByCondition(
    @Body('condition') condition: Prisma.masterTypeleaveFindFirstArgs,
  ) {
    return this.mastertypeleaveService.findOneByCondition(condition);
  }

  @Patch()
  update(
    @Body('id') id: number,
    @Body('data') data: Prisma.masterTypeleaveUpdateInput,
  ) {
    return this.mastertypeleaveService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.mastertypeleaveService.remove(Number(id));
  }
}
