import { Module } from '@nestjs/common';
import { informationNewsService } from './informationNews.service';
import { InformationController } from './informationNews.controller';
import { PrismaModule } from '@inventory/share';

@Module({
  imports: [PrismaModule],
  controllers: [InformationController],
  providers: [informationNewsService],
})
export class InformationNewsModule {}
