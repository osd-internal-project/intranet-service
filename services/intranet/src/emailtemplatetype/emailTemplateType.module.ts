import { Module } from '@nestjs/common';
import { emailTemplateTypeService } from './emailTemplateType.service';
import {emailTemplateTypeController } from './emailTemplateType.controller';
import { PrismaModule } from '@inventory/share';

@Module({
  imports: [PrismaModule],
  controllers: [emailTemplateTypeController],
  providers: [emailTemplateTypeService],
})
export class emailTemplateTypeModule {}
