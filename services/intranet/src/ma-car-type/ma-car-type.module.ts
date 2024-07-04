import { Module } from '@nestjs/common';
import { MaCarTypeService } from './ma-car-type.service';
import { MaCarTypeController } from './ma-car-type.controller';
import { PrismaModule } from '@inventory/share';

@Module({
  imports: [PrismaModule],
  controllers: [MaCarTypeController],
  providers: [MaCarTypeService],
})
export class MaCarTypeModule {}
