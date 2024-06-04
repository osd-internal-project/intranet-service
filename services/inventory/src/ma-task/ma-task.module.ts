import { Module } from '@nestjs/common';
import { MaTaskService } from './ma-task.service';
import { MaTaskController } from './ma-task.controller';
import { PrismaModule } from '@inventory/share';

@Module({
  imports: [PrismaModule],
  controllers: [MaTaskController],
  providers: [MaTaskService],
})
export class MaTaskModule {}
