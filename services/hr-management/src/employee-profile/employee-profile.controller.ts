import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EmployeeProfileService } from './employee-profile.service';
import { CreateEmployeeProfileDto } from './dto/create-employee-profile.dto';
import { UpdateEmployeeProfileDto } from './dto/update-employee-profile.dto';

@Controller('employee-profile')
export class EmployeeProfileController {
  constructor(private readonly employeeProfileService: EmployeeProfileService) {}

  @Post()
  create(@Body() createEmployeeProfileDto: CreateEmployeeProfileDto) {
    return this.employeeProfileService.create(createEmployeeProfileDto);
  }

  @Get()
  findAll() {
    return this.employeeProfileService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.employeeProfileService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEmployeeProfileDto: UpdateEmployeeProfileDto) {
    return this.employeeProfileService.update(+id, updateEmployeeProfileDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.employeeProfileService.remove(+id);
  }
}
