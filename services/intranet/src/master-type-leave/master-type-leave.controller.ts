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

  @Get(':id')
  findByTypeId(@Param('id') id: string) {
    return this.mastertypeleaveService.findByTypeId(+id);
  }

  @Post()
  create(@Body('condition') condition: Prisma.masterTypeleaveCreateInput) {
    return this.mastertypeleaveService.create(condition);
  }

  @Post('condition')
  async findByCondition(
    @Body('condition') condition: Prisma.masterTypeleaveFindManyArgs,
  ) {
    return await this.mastertypeleaveService.findByCondition(condition);
  }
  @Post('conditionId')
  async findByConditionTypeId(
    @Body('condition') condition: Prisma.masterTypeleaveFindManyArgs,
  ) {
    return await this.mastertypeleaveService.findOneByCondition(condition);
  }

  @Post('condition-first')
  findOneByCondition(
    @Body('condition') condition: Prisma.masterTypeleaveFindFirstArgs,
  ) {
    return this.mastertypeleaveService.findOneByCondition(condition);
  }

  @Patch()
  update(@Body('condition') condition: Prisma.masterTypeleaveUpdateArgs) {
    return this.mastertypeleaveService.update(condition);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.mastertypeleaveService.remove(+id);
  }
}
