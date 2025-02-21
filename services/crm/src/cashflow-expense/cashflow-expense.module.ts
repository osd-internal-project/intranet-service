import { Module } from '@nestjs/common';
import { CashflowExpenseService } from './cashflow-expense.service';
import { CashflowExpenseController } from './cashflow-expense.controller';
import { PrismaModule } from '@inventory/share';

@Module({
  imports: [PrismaModule],
  controllers: [CashflowExpenseController],
  providers: [CashflowExpenseService],
})
export class CashflowExpenseModule {}
