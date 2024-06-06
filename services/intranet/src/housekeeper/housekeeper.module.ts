import { Module } from '@nestjs/common';
import { HousekeeperService } from './housekeeper.service';
import { HousekeeperController } from './housekeeper.controller';
import { PrismaModule } from '@inventory/share';

@Module({
  imports: [PrismaModule],
  controllers: [HousekeeperController],
  providers: [HousekeeperService],
})
export class HousekeeperModule {}
