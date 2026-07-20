import { Module } from '@nestjs/common';
import { PrismaModule } from '@inventory/share';
import { MaVehicleTypeGroupService } from './ma-vehicle-type-group.service';
import { MaVehicleTypeGroupController } from './ma-vehicle-type-group.controller';

@Module({
  imports: [PrismaModule],
  controllers: [MaVehicleTypeGroupController],
  providers: [MaVehicleTypeGroupService],
})
export class MaVehicleTypeGroupModule {}
