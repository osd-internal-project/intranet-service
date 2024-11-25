import { Module } from '@nestjs/common';
import { MaCarBookService } from './ma-car-book.service';
import { MaCarBookController } from './ma-car-book.controller';
import { PrismaModule } from '@inventory/share';

@Module({
  imports: [PrismaModule],
  controllers: [MaCarBookController],
  providers: [MaCarBookService],
})
export class MaCarBookModule {}
