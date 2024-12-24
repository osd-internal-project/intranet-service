import { Module } from '@nestjs/common';
import { MasterRefreshmentService } from './master-refreshment.service';
import { MasterRefreshmentController } from './master-refreshment.controller';
import { PrismaModule } from '@inventory/share';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [PrismaModule],
  controllers: [MasterRefreshmentController],
  providers: [MasterRefreshmentService, JwtService],
})
export class MasterRefreshmentModule {}
