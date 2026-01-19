import { Injectable } from '@nestjs/common';
import {
  AccessService,
  ComplainProblemRepository,
  UsersRepository,
} from '@inventory/share';
import type { Prisma } from '@prisma/client';

@Injectable()
export class ComplainProblemService {
  constructor(
    private readonly complainProblemRepo: ComplainProblemRepository,
    private readonly usersRepo: UsersRepository,
    private readonly accessService: AccessService,
  ) {}
  create(createComplainProblemDto: Prisma.complainProblemCreateInput) {
    return this.complainProblemRepo.create({ data: createComplainProblemDto });
  }

  findAll() {
    return this.complainProblemRepo.findMany({
      include: {
        users: {
          select: { userId: true, firstNameTh: true, lastNameTh: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  findByUserId(userId: string) {
    return this.complainProblemRepo.findMany({
      where: { userId },
      include: {
        users: {
          select: { userId: true, firstNameTh: true, lastNameTh: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  findOne(id: number) {
    return this.complainProblemRepo.findOne({ where: { id } });
  }

  update(
    id: number,
    updateComplainProblemDto: Prisma.complainProblemUpdateInput,
  ) {
    return this.complainProblemRepo.update({
      where: { id },
      data: updateComplainProblemDto,
    });
  }

  remove(id: number) {
    return this.complainProblemRepo.delete({ where: { id } });
  }
}
