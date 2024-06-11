import { Module } from '@nestjs/common';
import { TpyeDataLeaveMapService } from './tpye-data-leave-map.service';
import { TpyeDataLeaveMapController } from './tpye-data-leave-map.controller';
import { PrismaModule } from '@inventory/share';

@Module({
  imports: [PrismaModule],
  controllers: [TpyeDataLeaveMapController],
  providers: [TpyeDataLeaveMapService],
})
export class TpyeDataLeaveMapModule {}
