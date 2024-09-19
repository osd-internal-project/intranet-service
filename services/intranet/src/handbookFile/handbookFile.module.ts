import { Module } from '@nestjs/common';
import { handbookFileService } from './handbookFile.service';
import { handbookFileController } from './handbookFile.controller';
import { PrismaModule } from '@inventory/share';

@Module({
  imports: [PrismaModule],
  controllers: [handbookFileController],
  providers: [handbookFileService],
})
export class handbookFileModule {}
