import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OrganizeManagementService } from './organize-management.service';
import { CreateOrganizeManagementDto } from './dto/create-organize-management.dto';
import { UpdateOrganizeManagementDto } from './dto/update-organize-management.dto';

@Controller('organize-management')
export class OrganizeManagementController {
  constructor(private readonly organizeManagementService: OrganizeManagementService) {}

  @Post()
  create(@Body() createOrganizeManagementDto: CreateOrganizeManagementDto) {
    return this.organizeManagementService.create(createOrganizeManagementDto);
  }

  @Get()
  findAll() {
    return this.organizeManagementService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.organizeManagementService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrganizeManagementDto: UpdateOrganizeManagementDto) {
    return this.organizeManagementService.update(+id, updateOrganizeManagementDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.organizeManagementService.remove(+id);
  }
}
