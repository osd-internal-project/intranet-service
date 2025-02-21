import { Module } from '@nestjs/common';
import { CashflowTypeService } from './cashflow-type.service';
import { CashflowTypeController } from './cashflow-type.controller';
import { PrismaModule } from '@inventory/share';

@Module({
  imports: [PrismaModule],
  controllers: [CashflowTypeController],
  providers: [CashflowTypeService],
})
export class CashflowTypeModule {}
