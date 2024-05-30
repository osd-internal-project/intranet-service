import { Module } from '@nestjs/common';
import { HousekeeperService } from './housekeeper.service';
import { HousekeeperController } from './housekeeper.controller';

@Module({
  controllers: [HousekeeperController],
  providers: [HousekeeperService]
})
export class HousekeeperModule {}
