import { Module } from '@nestjs/common';
import { PrismaModule } from '@inventory/share';
import { MaVehicleTypeService } from './ma-vehicle-type.service';
import { MaVehicleTypeController } from './ma-vehicle-type.controller';

@Module({
  imports: [PrismaModule],
  controllers: [MaVehicleTypeController],
  providers: [MaVehicleTypeService],
})
export class MaVehicleTypeModule {}
