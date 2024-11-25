import { Injectable } from '@nestjs/common';
import { CreateEmployeeRegisterDto } from './dto/create-employee-register.dto';
import { UpdateEmployeeRegisterDto } from './dto/update-employee-register.dto';

@Injectable()
export class EmployeeRegisterService {
  create(createEmployeeRegisterDto: CreateEmployeeRegisterDto) {
    return 'This action adds a new employeeRegister';
  }

  findAll() {
    return `This action returns all employeeRegister`;
  }

  findOne(id: number) {
    return `This action returns a #${id} employeeRegister`;
  }

  update(id: number, updateEmployeeRegisterDto: UpdateEmployeeRegisterDto) {
    return `This action updates a #${id} employeeRegister`;
  }

  remove(id: number) {
    return `This action removes a #${id} employeeRegister`;
  }
}
