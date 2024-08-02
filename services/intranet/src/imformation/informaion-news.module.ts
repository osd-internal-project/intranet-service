import { Module } from '@nestjs/common';
import { InformationService } from './informaion-news.service';
import { MaCarController } from './informaion-news.controller';
import { PrismaModule } from '@inventory/share';

@Module({
  imports: [PrismaModule],
  controllers: [MaCarController],
  providers: [InformationService],
})
export class MaCarModule {}
