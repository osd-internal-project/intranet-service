import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { OrganizeTaskService } from './organize-task.service';
import { CreateOrganizeTaskDto } from './dto/create-organize-task.dto';
import { UpdateOrganizeTaskDto } from './dto/update-organize-task.dto';
import { Prisma } from '@prisma/client';

@Controller('organize-task')
export class OrganizeTaskController {
  constructor(private readonly organizeTaskService: OrganizeTaskService) {}

  @Post()
  create(@Body() createOrganizeTaskDto: Prisma.organizeTaskCreateInput) {
    return this.organizeTaskService.create(createOrganizeTaskDto);
  }

  @Get()
  findAll() {
    return this.organizeTaskService.findAll();
  }

  @Post()
  findMany(@Body() condition: Prisma.organizeTaskFindManyArgs) {
    return this.organizeTaskService.findMany(condition);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.organizeTaskService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateOrganizeTaskDto: Prisma.organizeTaskUpdateInput,
  ) {
    return this.organizeTaskService.update(+id, updateOrganizeTaskDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.organizeTaskService.remove(+id);
  }
}
