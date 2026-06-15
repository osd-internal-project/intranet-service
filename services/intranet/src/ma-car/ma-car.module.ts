import { Module } from '@nestjs/common';
import { MaCarService } from './ma-car.service';
import { MaCarController } from './ma-car.controller';
import { MaCarCronService } from './ma-car.cron';
import { PrismaModule } from '@inventory/share';

@Module({
  imports: [PrismaModule],
  controllers: [MaCarController],
  providers: [MaCarService, MaCarCronService],
})
export class MaCarModule {}
