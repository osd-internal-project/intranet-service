import { Module } from '@nestjs/common';
import { MaCarBookService } from './ma-car-book.service';
import { MaCarBookController } from './ma-car-book.controller';
import { PrismaModule } from '@inventory/share';
import { EmailService } from '../Emailtranfer/email.service';

@Module({
  imports: [PrismaModule],
  controllers: [MaCarBookController],
  providers: [MaCarBookService,EmailService],
})
export class MaCarBookModule {}
