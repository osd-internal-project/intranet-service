import { Module } from '@nestjs/common';
import { handbookFileService } from './handbookFile.service';
import { handbookFileController } from './handbookFile.controller';
import { PrismaModule } from '@inventory/share';
import { EmailService } from '../public/email.service'; 

@Module({
  imports: [PrismaModule],
  controllers: [handbookFileController],
  providers: [handbookFileService,EmailService],
})
export class handbookFileModule {}
