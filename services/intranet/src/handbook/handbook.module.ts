import { Module } from '@nestjs/common';
import { handbookService } from './handbook.service';
import { handbookController } from './handbook.controller';
import { PrismaModule } from '@inventory/share';

@Module({
  imports: [PrismaModule],
  controllers: [handbookController],
  providers: [handbookService],
})
export class NewsTypeModule {}
