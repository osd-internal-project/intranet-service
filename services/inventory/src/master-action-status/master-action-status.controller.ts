import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { MasterActionStatusService } from './master-action-status.service';
import { Prisma } from '@prisma/client';

@Controller('master-action-status')
export class MasterActionStatusController {
  constructor(
    private readonly masterActionStatusService: MasterActionStatusService,
  ) {}

  @Post()
  create(@Body('data') data: Prisma.masterActionStatusCreateInput) {
    return this.masterActionStatusService.create(data);
  }

  @Post('create/many')
  createMany(@Body('data') data: Prisma.masterActionStatusCreateManyInput) {
    return this.masterActionStatusService.createMany(data);
  }

  @Get()
  findAll() {
    return this.masterActionStatusService.findAll();
  }

  @Post('condition')
  findMany(
    @Body('condition') condition: Prisma.masterActionStatusFindManyArgs,
  ) {
    return this.masterActionStatusService.findMany(condition);
  }

  @Patch()
  update(
    @Body('id') id: number,
    @Body('data') data: Prisma.masterActionStatusUpdateInput,
  ) {
    return this.masterActionStatusService.update(id, data);
  }

  @Delete()
  remove(@Body('id') id: number) {
    return this.masterActionStatusService.remove(id);
  }
}
