import { Injectable } from '@nestjs/common';
import {
  mistakesTypeRepository,
  AccessService,
  employeePropertyRepository,
  UsersRepository,
} from '@inventory/share';
import { Prisma } from '@prisma/client';

@Injectable()
export class MistakesTypeService {
  constructor(
    private readonly mistakestypeRepo: mistakesTypeRepository,
    private readonly employeePropertyRepo: employeePropertyRepository,
    private readonly usersRepo: UsersRepository,
    private readonly accessService: AccessService,
  ) {}
  create(createMistakesTypeDto: Prisma.mistakesTypeCreateInput) {
    return this.mistakestypeRepo.create({ data: createMistakesTypeDto });
  }

  findAll() {
    return this.mistakestypeRepo.findMany({});
  }

  findOne(id: number) {
    return this.mistakestypeRepo.findOne({ where: { id } });
  }

  async findByUserId(userId: string) {
    const user = await this.usersRepo.findOne({ where: { userId: userId } });
    if (!user) {
      throw new Error('User not found');
    }
    const employeeProperty = await this.employeePropertyRepo.findMany({
      where: { userId: user.userId },
    });
    if (!employeeProperty) {
      throw new Error('Employee Property not found');
    }

    return employeeProperty;
  }

  update(id: number, updateMistakesTypeDto: Prisma.mistakesTypeUpdateInput) {
    return this.mistakestypeRepo.update({
      where: { id },
      data: updateMistakesTypeDto,
    });
  }

  remove(id: number) {
    return this.mistakestypeRepo.delete({ where: { id } });
  }
}
