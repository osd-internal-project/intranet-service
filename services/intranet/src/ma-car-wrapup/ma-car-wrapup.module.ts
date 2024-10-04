import { Module } from '@nestjs/common';
import { MaCarWrapupService } from './ma-car-wrapup.service';
import { MaCarWrapupController } from './ma-car-wrapup.controller';
import { PrismaModule } from '@inventory/share';
import { EmailService } from '../Emailtranfer/email.service'; 
@Module({
  imports: [PrismaModule],
  controllers: [MaCarWrapupController],
  providers: [MaCarWrapupService,EmailService],
})
export class MaCarWrapupModule {}
