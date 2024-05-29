import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Delete,
  Param,
} from '@nestjs/common';
import { MasterObjectiveService } from './master-objective.service';
import { Prisma } from '@prisma/client';
@Controller('master-objective')
export class MasterObjectiveController {
  constructor(
    private readonly masterObjectiveService: MasterObjectiveService,
  ) {}

  @Post()
  create(@Body('data') data: Prisma.masterObjectiveCreateInput) {
    return this.masterObjectiveService.create(data);
  }

  @Get()
  findAll() {
    return this.masterObjectiveService.findAll();
  }

  @Post('condition')
  findByCondition(
    @Body('condition') condition: Prisma.masterObjectiveFindManyArgs,
  ) {
    return this.masterObjectiveService.findByCondition(condition);
  }

  @Post('condition-first')
  findOneByCondition(
    @Body('condition') condition: Prisma.masterObjectiveFindFirstArgs,
  ) {
    return this.masterObjectiveService.findOneByCondition(condition);
  }

  @Patch()
  update(
    @Body('id') id: number,
    @Body('data') data: Prisma.masterObjectiveUpdateInput,
  ) {
    return this.masterObjectiveService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.masterObjectiveService.remove(Number(id));
  }
}
