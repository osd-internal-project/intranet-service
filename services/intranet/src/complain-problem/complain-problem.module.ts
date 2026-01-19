import { Module } from '@nestjs/common';
import { ComplainProblemService } from './complain-problem.service';
import { ComplainProblemController } from './complain-problem.controller';
import { PrismaModule } from '@inventory/share';

@Module({
  imports: [PrismaModule],
  controllers: [ComplainProblemController],
  providers: [ComplainProblemService],
})
export class ComplainProblemModule {}
