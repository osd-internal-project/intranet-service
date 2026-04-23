import { Injectable } from '@nestjs/common';
import { CreateOrganizeManagementDto } from './dto/create-organize-management.dto';
import { UpdateOrganizeManagementDto } from './dto/update-organize-management.dto';

@Injectable()
export class OrganizeManagementService {
  create(createOrganizeManagementDto: CreateOrganizeManagementDto) {
    return 'This action adds a new organizeManagement';
  }

  findAll() {
    return `This action returns all organizeManagement`;
  }

  findOne(id: number) {
    return `This action returns a #${id} organizeManagement`;
  }

  update(id: number, updateOrganizeManagementDto: UpdateOrganizeManagementDto) {
    return `This action updates a #${id} organizeManagement`;
  }

  remove(id: number) {
    return `This action removes a #${id} organizeManagement`;
  }
}
