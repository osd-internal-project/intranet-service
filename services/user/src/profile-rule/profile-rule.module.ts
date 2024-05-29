import { Module } from '@nestjs/common';
import { ProfileRuleService } from './profile-rule.service';
import { ProfileRuleController } from './profile-rule.controller';
import { PrismaModule } from '@inventory/share';

@Module({
  imports: [PrismaModule],
  controllers: [ProfileRuleController],
  providers: [ProfileRuleService],
})
export class ProfileRuleModule {}
