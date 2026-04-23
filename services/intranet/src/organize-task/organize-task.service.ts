import { Injectable } from '@nestjs/common';
import { CreateOrganizeTaskDto } from './dto/create-organize-task.dto';
import { UpdateOrganizeTaskDto } from './dto/update-organize-task.dto';

@Injectable()
export class OrganizeTaskService {
  create(createOrganizeTaskDto: CreateOrganizeTaskDto) {
    return 'This action adds a new organizeTask';
  }

  findAll() {
    return `This action returns all organizeTask`;
  }

  findOne(id: number) {
    return `This action returns a #${id} organizeTask`;
  }

  update(id: number, updateOrganizeTaskDto: UpdateOrganizeTaskDto) {
    return `This action updates a #${id} organizeTask`;
  }

  remove(id: number) {
    return `This action removes a #${id} organizeTask`;
  }
}
