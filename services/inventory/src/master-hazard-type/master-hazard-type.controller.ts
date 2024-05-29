import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Delete,
  Param,
} from '@nestjs/common';
import { MasterHazardtypeService } from './master-hazard-type.service';
import { Prisma } from '@prisma/client';
@Controller('master-hazard-type')
export class MasterHazardtypeController {
  constructor(
    private readonly masterHazardtypeService: MasterHazardtypeService,
  ) {}

  @Post()
  create(@Body('data') data: Prisma.masterHazardtypeCreateInput) {
    return this.masterHazardtypeService.create(data);
  }

  @Get()
  findAll() {
    return this.masterHazardtypeService.findAll();
  }

  @Post('condition')
  findByCondition(
    @Body('condition') condition: Prisma.masterHazardtypeFindManyArgs,
  ) {
    return this.masterHazardtypeService.findByCondition(condition);
  }

  @Post('condition-first')
  findOneByCondition(
    @Body('condition') condition: Prisma.masterHazardtypeFindFirstArgs,
  ) {
    return this.masterHazardtypeService.findOneByCondition(condition);
  }

  @Patch()
  update(
    @Body('id') id: number,
    @Body('data') data: Prisma.masterHazardtypeUpdateInput,
  ) {
    return this.masterHazardtypeService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.masterHazardtypeService.remove(Number(id));
  }
}
