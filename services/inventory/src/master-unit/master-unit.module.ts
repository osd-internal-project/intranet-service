import { Module } from '@nestjs/common';
import { MasterUnitService } from './master-unit.service';
import { MasterUnitController } from './master-unit.controller';
import { PrismaModule } from '@inventory/share';

@Module({
  imports: [PrismaModule],
  controllers: [MasterUnitController],
  providers: [MasterUnitService],
})
export class MasterUnitModule {}
