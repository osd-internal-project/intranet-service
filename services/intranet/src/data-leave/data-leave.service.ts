import { Injectable } from '@nestjs/common';
import { CreateDataLeaveDto } from './dto/create-data-leave.dto';
import { UpdateDataLeaveDto } from './dto/update-data-leave.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class DataLeaveService {
  create(createDataLeaveDto: CreateDataLeaveDto) {
    return 'This action adds a new dataLeave';
  }

  findAll() {
    return `This action returns all dataLeave`;
  }
  findOne(id: number) {
    return `This action returns a #${id} dataLeave`;
  }
  findMany(id: Prisma.dataLeaveFindFirstArgs) {
    return `This action returns a #${id} dataLeave`;
  }

  update(condition: Prisma.dataLeaveUpdateArgs) {
    return `This action updates a #${condition} dataLeave`;
  }

  remove(id: number) {
    return `This action removes a #${id} dataLeave`;
  }
}
