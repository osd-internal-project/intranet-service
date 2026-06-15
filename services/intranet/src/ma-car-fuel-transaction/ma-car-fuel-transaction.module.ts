import { Module } from '@nestjs/common';
import { MaCarFuelTransactionService } from './ma-car-fuel-transaction.service';
import { MaCarFuelTransactionController } from './ma-car-fuel-transaction.controller';
import { PrismaModule } from '@inventory/share';

@Module({
  imports: [PrismaModule],
  controllers: [MaCarFuelTransactionController],
  providers: [MaCarFuelTransactionService],
})
export class MaCarFuelTransactionModule {}
