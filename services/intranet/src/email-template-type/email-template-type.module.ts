import { Module } from '@nestjs/common';
import { EmailTemplateTypeService } from './email-template-type.service';
import { EmailTemplateTypeController } from './email-template-type.controller';
import { PrismaModule } from '@inventory/share';

@Module({
  imports: [PrismaModule],
  controllers: [EmailTemplateTypeController],
  providers: [EmailTemplateTypeService],
})
export class EmailTemplateTypeModule {}
