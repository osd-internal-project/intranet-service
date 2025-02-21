import { Module } from '@nestjs/common';
import { CashflowSaleService } from './cashflow-sale.service';
import { CashflowSaleController } from './cashflow-sale.controller';
import { PrismaModule } from '@inventory/share';

@Module({
  imports: [PrismaModule],
  controllers: [CashflowSaleController],
  providers: [CashflowSaleService],
})
export class CashflowSaleModule {}
