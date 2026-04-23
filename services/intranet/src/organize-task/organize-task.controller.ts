import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OrganizeTaskService } from './organize-task.service';
import { CreateOrganizeTaskDto } from './dto/create-organize-task.dto';
import { UpdateOrganizeTaskDto } from './dto/update-organize-task.dto';

@Controller('organize-task')
export class OrganizeTaskController {
  constructor(private readonly organizeTaskService: OrganizeTaskService) {}

  @Post()
  create(@Body() createOrganizeTaskDto: CreateOrganizeTaskDto) {
    return this.organizeTaskService.create(createOrganizeTaskDto);
  }

  @Get()
  findAll() {
    return this.organizeTaskService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.organizeTaskService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrganizeTaskDto: UpdateOrganizeTaskDto) {
    return this.organizeTaskService.update(+id, updateOrganizeTaskDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.organizeTaskService.remove(+id);
  }
}
