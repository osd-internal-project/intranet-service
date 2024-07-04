import { Module } from '@nestjs/common';
import { MaCarService } from './ma-car.service';
import { MaCarController } from './ma-car.controller';
import { PrismaModule } from '@inventory/share';

@Module({
  imports: [PrismaModule],
  controllers: [MaCarController],
  providers: [MaCarService],
})
export class MaCarModule {}
