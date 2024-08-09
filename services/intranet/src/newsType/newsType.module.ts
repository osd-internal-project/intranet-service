import { Module } from '@nestjs/common';
import { newsTypeService } from './newsType.service';
import { newsTypeController } from './newsType.controller';
import { PrismaModule } from '@inventory/share';

@Module({
  imports: [PrismaModule],
  controllers: [newsTypeController],
  providers: [newsTypeService],
})
export class NewsTypeModule {}
