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
  optionsTemplate() {
    return this.emailtemplateRepo.findMany({
      where: {
        status: 'active',
      },
    });
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
    const base: Prisma.emailTemplateFindManyArgs = {
      where: {
        type: typeId,
      },
      include: {
        emailTemplateType: true,
      },
    };
    return this.emailtemplateRepo.findMany(
      typeId === 0
        ? {
            include: {
              emailTemplateType: true,
            },
          }
        : base,
    );
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
