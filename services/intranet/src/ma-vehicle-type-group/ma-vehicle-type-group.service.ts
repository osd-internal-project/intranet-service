import { Injectable } from '@nestjs/common';
import { MaVehicleTypeGroupRepository } from '@inventory/share';
import { Prisma } from '@prisma/client';

@Injectable()
export class MaVehicleTypeGroupService {
  constructor(
    private readonly maVehicleTypeGroupRepository: MaVehicleTypeGroupRepository,
  ) {}

  create(data: Prisma.maVehicleTypeGroupCreateInput) {
    const condition = { data } as Prisma.maVehicleTypeGroupCreateArgs;
    return this.maVehicleTypeGroupRepository.create(condition);
  }

  findAll() {
    return this.maVehicleTypeGroupRepository.findMany({ orderBy: { id: 'asc' } });
  }

  async update(id: number, data: Prisma.maVehicleTypeGroupUpdateInput) {
    const condition = {
      where: { id },
      data,
    } as Prisma.maVehicleTypeGroupUpdateArgs;
    return await this.maVehicleTypeGroupRepository.update(condition);
  }

  async remove(id: number) {
    const condition = { where: { id } } as Prisma.maVehicleTypeGroupDeleteArgs;
    return await this.maVehicleTypeGroupRepository.delete(condition);
  }
}
