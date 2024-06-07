import { Module } from '@nestjs/common';
import { MasterHolidaysService } from './master-holidays.service';
import { MasterHolidaysController } from './master-holidays.controller';
import { PrismaModule } from '@inventory/share';

@Module({
  imports: [PrismaModule],
  controllers: [MasterHolidaysController],
  providers: [MasterHolidaysService],
})
export class MasterHolidaysModule {}
