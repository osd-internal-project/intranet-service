import { Module } from '@nestjs/common';
import { MasterPositionService } from './master-position.service';
import { MasterPositionController } from './master-position.controller';
import { PrismaModule } from '@inventory/share';

@Module({
  imports: [PrismaModule],
  controllers: [MasterPositionController],
  providers: [MasterPositionService],
})
export class MasterPositionModule {}
