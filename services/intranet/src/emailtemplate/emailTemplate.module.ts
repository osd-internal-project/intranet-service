import { Module } from '@nestjs/common';
import { emailTemplateService } from './emailTemplate.service';
import { emailTemplateController } from './emailTemplate.controller';
import { PrismaModule } from '@inventory/share';

@Module({
  imports: [PrismaModule],
  controllers: [emailTemplateController],
  providers: [emailTemplateService],
})
export class emailTemplateModule {}
