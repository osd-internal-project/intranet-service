import { Module } from '@nestjs/common';
import { EmailTemplateFieldsService } from './email-template-fields.service';
import { EmailTemplateFieldsController } from './email-template-fields.controller';
import { PrismaModule } from '@inventory/share';

@Module({
  imports: [PrismaModule],
  controllers: [EmailTemplateFieldsController],
  providers: [EmailTemplateFieldsService],
})
export class EmailTemplateFieldsModule {}
