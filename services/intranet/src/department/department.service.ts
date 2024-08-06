import { Injectable } from '@nestjs/common';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { DepartMentRepository } from '@inventory/share';
import { Prisma } from '@prisma/client';

@Injectable()
export class DepartmentService {
  constructor(private readonly departMentRepo: DepartMentRepository) {}
  create(createDepartmentDto: CreateDepartmentDto) {
    return this.departMentRepo.create({ data: createDepartmentDto });
  }

  findAll() {
    return this.departMentRepo.findMany({ orderBy: { departId: 'asc' } });
  }

  findOne(departId: number) {
    return this.departMentRepo.findMany({ where: { departId: departId } });
  }

  update(departId: number, updateDepartmentDto: UpdateDepartmentDto) {
    return this.departMentRepo.update({
      where: { departId: departId },
      data: updateDepartmentDto,
    });
  }

  findOneByCondition(condition: Prisma.departMentFindFirstArgsBase) {
    condition = {
      ...condition,
    };
    return this.departMentRepo.findMany(condition);
  }

  remove(id: number) {
    return `This action removes a #${id} department`;
  }
}
