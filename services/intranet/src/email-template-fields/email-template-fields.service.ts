import { emailTemplateFieldsRepository } from '@inventory/share';
import { Injectable } from '@nestjs/common';

@Injectable()
export class EmailTemplateFieldsService {
  constructor(
    private readonly emailtemplatefieldsRepo: emailTemplateFieldsRepository,
  ) {}
  findAll() {
    return this.emailtemplatefieldsRepo.findAll();
  }
}
