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
    return `This action returns a #${id} emailTemplate`;
  }

  update(id: number, updateEmailTemplateDto: UpdateEmailTemplateDto) {
    return `This action updates a #${id} emailTemplate`;
  }

  remove(id: number) {
    return `This action removes a #${id} emailTemplate`;
  }
}
