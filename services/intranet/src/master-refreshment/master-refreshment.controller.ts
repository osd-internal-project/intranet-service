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
import { MasterRefreshmentService } from './master-refreshment.service';
import { Prisma } from '@prisma/client';

@Controller('refreshment')
export class MasterRefreshmentController {
  constructor(private masterRefreshmentService: MasterRefreshmentService) {}

  @Post()
  create(@Body() data: Prisma.masterRefreshmentCreateInput) {
    return this.masterRefreshmentService.create(data);
  }

  @Get()
  findAll(@Query('skip') skip?: number, @Query('take') take?: number) {
    if (skip !== undefined && take !== undefined) {
      return this.masterRefreshmentService.findMany(+skip, +take);
    }
    return this.masterRefreshmentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.masterRefreshmentService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() data: Prisma.masterRefreshmentUpdateInput,
  ) {
    return this.masterRefreshmentService.update(+id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.masterRefreshmentService.remove(+id);
  }
}
