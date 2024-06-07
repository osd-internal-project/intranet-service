import { Injectable } from '@nestjs/common';
import { CreateOrganizeChartDto } from './dto/create-organize-chart.dto';
import { UpdateOrganizeChartDto } from './dto/update-organize-chart.dto';
import { OrganizedRepository } from '@inventory/share';

@Injectable()
export class OrganizeChartService {
  constructor(private readonly organizedRepo: OrganizedRepository) {}
  create(createOrganizeChartDto: CreateOrganizeChartDto) {
    return this.organizedRepo.create({ data: createOrganizeChartDto });
  }

  findAll() {
    return this.organizedRepo.findAll({});
  }

  findOne(id: number) {
    return `This action returns a #${id} organizeChart`;
  }

  update(id: number, updateOrganizeChartDto: UpdateOrganizeChartDto) {
    return `This action updates a #${id} organizeChart`;
  }

  remove(id: number) {
    return `This action removes a #${id} organizeChart`;
  }
}
