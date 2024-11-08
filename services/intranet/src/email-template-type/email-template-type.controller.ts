import { Body, Controller, Get, Patch } from '@nestjs/common';
import { EmailTemplateTypeService } from './email-template-type.service';

@Controller('email-template-type')
export class EmailTemplateTypeController {
  constructor(
    private readonly emailTemplateTypeService: EmailTemplateTypeService,
  ) {}
  @Get()
  findAll() {
    return this.emailTemplateTypeService.findAll();
  }
  @Patch()
  update(
    @Body() updateEmailTemplateDto: { templateUsedId: string; typeId: number },
  ) {
    return this.emailTemplateTypeService.update(updateEmailTemplateDto);
  }
}
