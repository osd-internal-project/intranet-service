import { Module } from '@nestjs/common';
import { MaTaskService } from './ma-task.service';
import { MaTaskController } from './ma-task.controller';
import { PrismaModule } from '@inventory/share';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [PrismaModule],
  controllers: [MaTaskController],
  providers: [MaTaskService, JwtService],
})
export class MaTaskModule {}
