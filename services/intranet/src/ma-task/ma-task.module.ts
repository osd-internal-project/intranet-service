import { Module } from '@nestjs/common';
import { MaTaskService } from './ma-task.service';
import { MaTaskController } from './ma-task.controller';
import { AuthGuard, AuthguardModule, PrismaModule } from '@inventory/share';
import { JwtModule, JwtService } from '@nestjs/jwt';

@Module({
  imports: [PrismaModule, AuthguardModule],
  controllers: [MaTaskController],
  providers: [MaTaskService],
})
export class MaTaskModule {}
