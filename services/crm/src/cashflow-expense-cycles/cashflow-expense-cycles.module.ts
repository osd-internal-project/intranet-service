import { Module } from '@nestjs/common';
import { CashflowExpenseCyclesService } from './cashflow-expense-cycles.service';
import { CashflowExpenseCyclesController } from './cashflow-expense-cycles.controller';
import { PrismaModule } from '@inventory/share';

@Module({
  imports: [PrismaModule],
  controllers: [CashflowExpenseCyclesController],
  providers: [CashflowExpenseCyclesService],
})
export class CashflowExpenseCyclesModule {}
