import { Module } from '@nestjs/common';
import { CustomerBranchService } from './customer-branch.service';
import { CustomerBranchController } from './customer-branch.controller';
import { PrismaModule } from '@inventory/share';

@Module({
  imports: [PrismaModule],
  controllers: [CustomerBranchController],
  providers: [CustomerBranchService],
})
export class CustomerBranchModule {}
