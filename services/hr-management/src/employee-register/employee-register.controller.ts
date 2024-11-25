import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EmployeeRegisterService } from './employee-register.service';
import { CreateEmployeeRegisterDto } from './dto/create-employee-register.dto';
import { UpdateEmployeeRegisterDto } from './dto/update-employee-register.dto';

@Controller('employee-register')
export class EmployeeRegisterController {
  constructor(private readonly employeeRegisterService: EmployeeRegisterService) {}

  @Post()
  create(@Body() createEmployeeRegisterDto: CreateEmployeeRegisterDto) {
    return this.employeeRegisterService.create(createEmployeeRegisterDto);
  }

  @Get()
  findAll() {
    return this.employeeRegisterService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.employeeRegisterService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEmployeeRegisterDto: UpdateEmployeeRegisterDto) {
    return this.employeeRegisterService.update(+id, updateEmployeeRegisterDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.employeeRegisterService.remove(+id);
  }
}
