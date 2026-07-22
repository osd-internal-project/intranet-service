import { Module } from '@nestjs/common';
import { PrismaModule } from '@inventory/share';
import { MaCarDashboardController } from './ma-car-dashboard.controller';
import { MaCarDashboardService } from './ma-car-dashboard.service';

@Module({
  imports: [PrismaModule],
  controllers: [MaCarDashboardController],
  providers: [MaCarDashboardService],
})
export class MaCarDashboardModule {}
