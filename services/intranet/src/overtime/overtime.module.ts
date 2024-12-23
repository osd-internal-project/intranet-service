import { Module } from '@nestjs/common';
import { PrismaModule } from '@inventory/share';
import { OvetimeController } from './overtime.controller';
import { OverTimeService } from './overtime.service';

@Module({
  imports: [PrismaModule],
  controllers: [OvetimeController],
  providers: [OverTimeService],
})
export class DepartmentModule {}
