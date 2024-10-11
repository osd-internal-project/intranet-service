import { Injectable } from '@nestjs/common';
import { CreateEmailTemplateTypeDto } from './dto/create-email-template-type.dto';
import { UpdateEmailTemplateTypeDto } from './dto/update-email-template-type.dto';
import { emailTemplateTypeRepository } from '@inventory/share';

@Injectable()
export class EmailTemplateTypeService {
  constructor(
    private readonly emailtemplatetypesRepo: emailTemplateTypeRepository,
  ) {}

  findAll() {
    return this.emailtemplatetypesRepo.findMany({
      include: {
        emailTemplateFields: true,
      },
    });
  }
}
