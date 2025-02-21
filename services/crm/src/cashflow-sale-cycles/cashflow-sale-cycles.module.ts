import { Module } from '@nestjs/common';
import { CashflowSaleCyclesService } from './cashflow-sale-cycles.service';
import { CashflowSaleCyclesController } from './cashflow-sale-cycles.controller';
import { PrismaModule } from '@inventory/share';

@Module({
  imports: [PrismaModule],
  controllers: [CashflowSaleCyclesController],
  providers: [CashflowSaleCyclesService],
})
export class CashflowSaleCyclesModule {}
