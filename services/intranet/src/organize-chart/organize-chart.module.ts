import { Module } from '@nestjs/common';
import { OrganizeChartService } from './organize-chart.service';
import { OrganizeChartController } from './organize-chart.controller';
import { PrismaModule } from '@inventory/share';

@Module({
  imports: [PrismaModule],
  controllers: [OrganizeChartController],
  providers: [OrganizeChartService],
})
export class OrganizeChartModule {}
