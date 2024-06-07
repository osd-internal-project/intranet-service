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
  create(@Body('condition') condition: Prisma.masterTypeleaveCreateInput) {
    console.log(condition);
    return this.mastertypeleaveService.create(condition);
  }

  @Post('condition')
  async findByCondition(
    @Body('condition') condition: Prisma.masterTypeleaveFindManyArgs,
  ) {
    return await this.mastertypeleaveService.findByCondition(condition);
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
