import { Injectable } from '@nestjs/common';
import { MaVehicleTypeRepository } from '@inventory/share';
import { Prisma } from '@prisma/client';

@Injectable()
export class MaVehicleTypeService {
  constructor(private readonly maVehicleTypeRepository: MaVehicleTypeRepository) {}

  create(data: Prisma.maVehicleTypeCreateInput) {
    const condition = { data } as Prisma.maVehicleTypeCreateArgs;
    return this.maVehicleTypeRepository.create(condition);
  }

  findAll() {
    return this.maVehicleTypeRepository.findMany({
      orderBy: { id: 'asc' },
      include: { maVehicleTypeGroup: true },
    } as Prisma.maVehicleTypeFindManyArgs);
  }

  async update(id: number, data: Prisma.maVehicleTypeUpdateInput) {
    const condition = {
      where: { id },
      data,
    } as Prisma.maVehicleTypeUpdateArgs;
    return await this.maVehicleTypeRepository.update(condition);
  }

  async remove(id: number) {
    const condition = { where: { id } } as Prisma.maVehicleTypeDeleteArgs;
    return await this.maVehicleTypeRepository.delete(condition);
  }
}
