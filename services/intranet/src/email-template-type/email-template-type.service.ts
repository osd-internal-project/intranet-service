import { Injectable } from '@nestjs/common';
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
