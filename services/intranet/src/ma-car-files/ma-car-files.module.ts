import { Module } from '@nestjs/common';
import { MaCarFilesService } from './ma-car-files.service';
import { MaCarFilesController } from './ma-car-files.controller';
import { PrismaModule } from '@inventory/share';

@Module({
  imports: [PrismaModule],
  controllers: [MaCarFilesController],
  providers: [MaCarFilesService],
})
export class MaCarFilesModule { }
