import { Module } from '@nestjs/common';
import { MaTaskFilesService } from './ma-task-files.service';
import { MaTaskFilesController } from './ma-task-files.controller';
import { PrismaModule } from '@inventory/share';

@Module({
  imports: [PrismaModule],
  controllers: [MaTaskFilesController],
  providers: [MaTaskFilesService],
})
export class MaTaskFilesModule {}
