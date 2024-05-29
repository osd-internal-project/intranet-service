import { Module } from '@nestjs/common';
import { ProfileRuleMapService } from './profile-rule-map.service';
import { ProfileRuleMapController } from './profile-rule-map.controller';
import { PrismaModule } from '@inventory/share';

@Module({
  imports: [PrismaModule],
  controllers: [ProfileRuleMapController],
  providers: [ProfileRuleMapService],
})
export class ProfileRuleMapModule {}
