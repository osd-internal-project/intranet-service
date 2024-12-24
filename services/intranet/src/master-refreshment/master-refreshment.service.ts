import { Injectable } from '@nestjs/common';
import { AccessService, MasterRefreshmentRepository } from '@inventory/share';
import { Prisma } from '@prisma/client';

@Injectable()
export class MasterRefreshmentService {
  constructor(
    private masterRefreshmentRepository: MasterRefreshmentRepository,
    private readonly accessService: AccessService,
  ) {}
  create(data: Prisma.masterRefreshmentCreateInput) {
    const condition = { data: data } as Prisma.masterRefreshmentCreateArgs;
    return this.masterRefreshmentRepository.create(condition);
  }

  async findAll() {
    return this.masterRefreshmentRepository.findAll();
  }

  async findMany(skip: number, take: number) {
    const condition = {
      skip,
      take,
    } as Prisma.masterRefreshmentFindFirstArgsBase;
    const count = await this.masterRefreshmentRepository.count({});
    const result = await this.masterRefreshmentRepository.findMany(condition);
    return { data: result, count: count };
  }

  findOne(id: number) {
    return `This action returns a #${id} bookingRoom`;
  }

  async update(id: number, data: Prisma.masterRefreshmentUpdateInput) {
    const condition = {
      where: { id: id },
      data: data,
    } as Prisma.masterRefreshmentUpdateArgs;
    return await this.masterRefreshmentRepository.update(condition);
  }

  async remove(id: number) {
    const condition = {
      where: { id: id },
    } as Prisma.masterRefreshmentDeleteArgs;
    return await this.masterRefreshmentRepository.delete(condition);
  }
}
