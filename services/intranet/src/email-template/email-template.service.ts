import { Injectable } from '@nestjs/common';
import { CreateEmailTemplateDto } from './dto/create-email-template.dto';
import { UpdateEmailTemplateDto } from './dto/update-email-template.dto';
import { emailTemplateRepository } from '@inventory/share';
import { Prisma } from '@prisma/client';

@Injectable()
export class EmailTemplateService {
  constructor(private readonly emailtemplateRepo: emailTemplateRepository) {}
  create(createEmailTemplateDto: Prisma.emailTemplateCreateInput) {
    const base = {
      data: createEmailTemplateDto,
    };
    return this.emailtemplateRepo.create(base);
  }

  findAll() {
    return this.emailtemplateRepo.findAll();
  }

  findOne(id: number) {
    const base = {
      where: {
        id: id,
      },
    };
    return this.emailtemplateRepo.findOne(base);
  }

  findByType(typeId: number) {
    const base = {
      where: {
        type: typeId,
      },
    };
    return this.emailtemplateRepo.findMany(typeId === 0 ? {} : base);
  }

  update(id: number, updateEmailTemplateDto: UpdateEmailTemplateDto) {
    const base = {
      where: {
        id: id,
      },
      data: {
        ...updateEmailTemplateDto,
      },
    };
    return this.emailtemplateRepo.update(base);
  }

  remove(id: number) {
    const base = {
      where: {
        id: id,
      },
    };
    return this.emailtemplateRepo.delete(base);
  }
}
