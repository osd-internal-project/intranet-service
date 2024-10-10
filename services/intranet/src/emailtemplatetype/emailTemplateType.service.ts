import { Injectable } from '@nestjs/common';
import { emailTemplateTypeRepository } from '@inventory/share';
import { Prisma } from '@prisma/client';

@Injectable()
export class emailTemplateTypeService {
  constructor(private readonly emailTemplateTypeRepo: emailTemplateTypeRepository) {}

  create(data: Prisma.emailTemplateTypeCreateArgs) {
    return this.emailTemplateTypeRepo.create(data);
  }

  async findAll(condition: Prisma.emailTemplateTypeFindManyArgs) {
    return await this.emailTemplateTypeRepo.findMany({
      ...condition,
      orderBy: {
        idtype: 'asc',
      },
    });
  }

  async findNewsAll(condition: Prisma.emailTemplateTypeFindManyArgs) {
    return await this.emailTemplateTypeRepo.findMany({
      ...condition,
      orderBy: {
        idtype: 'desc',
      },
    });
  }

  async findOne(idtype: number) {
    const base = {};

    return await this.emailTemplateTypeRepo.findOne({
      where: {
        idtype: idtype,
      },
    });
  }

  update(idtype: number, condition: Prisma.emailTemplateTypeUpdateArgs) {
    const base = {
      where: {
        idtype: idtype,
      },
      data: condition,
    } as Prisma.emailTemplateTypeUpdateArgs;
    return this.emailTemplateTypeRepo.update(base);
  }

  async remove(idtype: number) {
    return await this.emailTemplateTypeRepo.delete({
      where: {
        idtype: idtype,
      },
    });
  }
}
