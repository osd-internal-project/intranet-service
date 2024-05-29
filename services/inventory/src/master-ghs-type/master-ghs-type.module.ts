import { Module } from '@nestjs/common';
import { MasterGhsTypeService } from './master-ghs-type.service';
import { MasterGhsTypeController } from './master-ghs-type.controller';
import { PrismaModule } from '@inventory/share';
@Module({
  imports: [PrismaModule],
  controllers: [MasterGhsTypeController],
  providers: [MasterGhsTypeService],
})
export class MasterGhsTypeModule {}
