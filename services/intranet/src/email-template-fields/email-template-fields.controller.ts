import { Controller, Get } from '@nestjs/common';
import { EmailTemplateFieldsService } from './email-template-fields.service';

@Controller('email-template-fields')
export class EmailTemplateFieldsController {
  constructor(
    private readonly emailTemplateFieldsService: EmailTemplateFieldsService,
  ) {}

  @Get()
  findAll() {
    return this.emailTemplateFieldsService.findAll();
  }
}
