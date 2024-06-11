import { Module } from '@nestjs/common';
import { TpyeDataLeaveMapService } from './tpye-data-leave-map.service';
import { TpyeDataLeaveMapController } from './tpye-data-leave-map.controller';

@Module({
  controllers: [TpyeDataLeaveMapController],
  providers: [TpyeDataLeaveMapService]
})
export class TpyeDataLeaveMapModule {}
