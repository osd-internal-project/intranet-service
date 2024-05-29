import { Module } from '@nestjs/common';
import { MasterHazardtypeService } from './master-hazard-type.service';
import { MasterHazardtypeController } from './master-hazard-type.controller';
import { PrismaModule } from '@inventory/share';

@Module({
  imports: [PrismaModule],
  controllers: [MasterHazardtypeController],
  providers: [MasterHazardtypeService],
})
export class MasterHazardtypeModule {}
