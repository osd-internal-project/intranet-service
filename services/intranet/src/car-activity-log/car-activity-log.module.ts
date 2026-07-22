import { Module } from '@nestjs/common';
import { PrismaModule } from '@inventory/share';
import { CarActivityLogController } from './car-activity-log.controller';

@Module({
  imports: [PrismaModule],
  controllers: [CarActivityLogController],
})
export class CarActivityLogModule {}
