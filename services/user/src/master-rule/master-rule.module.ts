import { Module } from '@nestjs/common';
import { MasterRuleService } from './master-rule.service';
import { MasterRuleController } from './master-rule.controller';
import { PrismaModule } from '@inventory/share';

@Module({
  imports: [PrismaModule],
  controllers: [MasterRuleController],
  providers: [MasterRuleService],
})
export class MasterRuleModule {}
