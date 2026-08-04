import { Module } from '@nestjs/common';
import { PrismaModule } from '@inventory/share';
import { MaCarReportController } from './ma-car-report.controller';
import { MaCarReportService } from './ma-car-report.service';

@Module({
  imports: [PrismaModule],
  controllers: [MaCarReportController],
  providers: [MaCarReportService],
})
export class MaCarReportModule {}
