import { Module } from '@nestjs/common';
import { CashflowActivityTypeService } from './cashflow-activity-type.service';
import { CashflowActivityTypeController } from './cashflow-activity-type.controller';
import { PrismaModule } from '@inventory/share';

@Module({
  imports: [PrismaModule],
  controllers: [CashflowActivityTypeController],
  providers: [CashflowActivityTypeService],
})
export class CashflowActivityTypeModule {}
