import { Injectable } from '@nestjs/common';
import { CreateEmployeeProfileDto } from './dto/create-employee-profile.dto';
import { UpdateEmployeeProfileDto } from './dto/update-employee-profile.dto';

@Injectable()
export class EmployeeProfileService {
  create(createEmployeeProfileDto: CreateEmployeeProfileDto) {
    return 'This action adds a new employeeProfile';
  }

  findAll() {
    return `This action returns all employeeProfile`;
  }

  findOne(id: number) {
    return `This action returns a #${id} employeeProfile`;
  }

  update(id: number, updateEmployeeProfileDto: UpdateEmployeeProfileDto) {
    return `This action updates a #${id} employeeProfile`;
  }

  remove(id: number) {
    return `This action removes a #${id} employeeProfile`;
  }
}
