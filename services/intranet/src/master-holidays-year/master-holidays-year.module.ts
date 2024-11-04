import { Module } from '@nestjs/common';
import { MasterHolidaysYearService } from './master-holidays-year.service';
import { MasterHolidaysYearController } from './master-holidays-year.controller';
import { PrismaModule } from '@inventory/share';

@Module({
  imports: [PrismaModule],
  controllers: [MasterHolidaysYearController],
  providers: [MasterHolidaysYearService],
})
export class MasterHolidaysYearModule {}
