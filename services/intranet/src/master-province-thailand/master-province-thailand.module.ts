import { Module } from '@nestjs/common';
import { MasterProvinceThailandService } from './master-province-thailand.service';
import { MasterProvinceThailandController } from './master-province-thailand.controller';
import { PrismaModule } from '@inventory/share';

@Module({
  imports: [PrismaModule],
  controllers: [MasterProvinceThailandController],
  providers: [MasterProvinceThailandService],
})
export class MasterProvinceThailandModule {}
