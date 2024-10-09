import { Injectable } from '@nestjs/common';
import { emailTemplateRepository } from '@inventory/share';
import { Prisma } from '@prisma/client';

@Injectable()
export class emailTemplateService {
  constructor(private readonly emailTemplateRepo: emailTemplateRepository) {}

  create(data: Prisma.emailTemplateCreateArgs) {
    return this.emailTemplateRepo.create(data);
  }

  async findAll(condition: Prisma.emailTemplateFindManyArgs) {
    return await this.emailTemplateRepo.findMany({
      ...condition,
      orderBy: {
        id: 'asc',
      },
    });
  }

  async findNewsAll(condition: Prisma.emailTemplateFindManyArgs) {
    return await this.emailTemplateRepo.findMany({
      ...condition,
      orderBy: {
        id: 'desc',
      },
    });
  }

  async findOne(id: number) {
    const base = {};

    return await this.emailTemplateRepo.findOne({
      where: {
        id: id,
      },
    });
  }

  update(id: number, condition: Prisma.emailTemplateUpdateArgs) {
    const base = {
      where: {
        id: id,
      },
      data: condition,
    } as Prisma.emailTemplateUpdateArgs;
    return this.emailTemplateRepo.update(base);
  }

  async remove(id: number) {
    return await this.emailTemplateRepo.delete({
      where: {
        id: id,
      },
    });
  }
}
