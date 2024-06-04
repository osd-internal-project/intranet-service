import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { MaTaskService } from './ma-task.service';
import { Prisma } from '@prisma/client';
@Controller('ma-task')
export class MaTaskController {
  constructor(private readonly maTaskService: MaTaskService) {}

  @Post()
  create(@Body() createMaTaskDto: Prisma.maTaskCreateInput) {
    return this.maTaskService.create(createMaTaskDto);
  }

  @Get()
  findAll() {
    return this.maTaskService.findAll();
  }

  @Get(':id')
  findOne(@Param('condition') condition: Prisma.maTaskFindFirstArgs) {
    return this.maTaskService.findOne(condition);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body('data') data: Prisma.maTaskUpdateInput,
  ) {
    return this.maTaskService.update(+id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.maTaskService.remove(+id);
  }
}
