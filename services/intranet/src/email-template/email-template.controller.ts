import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { EmailTemplateService } from './email-template.service';
import { UpdateEmailTemplateDto } from './dto/update-email-template.dto';
import { Prisma } from '@prisma/client';

@Controller('email-template')
export class EmailTemplateController {
  constructor(private readonly emailTemplateService: EmailTemplateService) {}

  @Post()
  create(@Body() createEmailTemplateDto: Prisma.emailTemplateCreateInput) {
    return this.emailTemplateService.create(createEmailTemplateDto);
  }

  @Get()
  findAll() {
    return this.emailTemplateService.findAll();
  }

  @Get('/options')
  optionsTemplate() {
    return this.emailTemplateService.optionsTemplate();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.emailTemplateService.findOne(+id);
  }

  @Get('type/:id')
  findByType(@Param('id') id: string) {
    return this.emailTemplateService.findByType(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateEmailTemplateDto: UpdateEmailTemplateDto,
  ) {
    return this.emailTemplateService.update(+id, updateEmailTemplateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.emailTemplateService.remove(+id);
  }
}
