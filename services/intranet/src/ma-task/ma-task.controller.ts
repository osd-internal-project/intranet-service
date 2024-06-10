import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Logger,
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
  @Get('data-table')
  findDataTable(@Query() query) {
    return this.maTaskService.findDataTable(query);
  }
  @Get('range-event')
  findRangeEvent(@Query() query) {
    return this.maTaskService.findRangeEvent(query);
  }

  @Get(':id')
  findOneById(@Param('id') id: string) {
    return this.maTaskService.findOneById(+id);
  }
  @Get()
  findAll() {
    return this.maTaskService.findAll();
  }
}
