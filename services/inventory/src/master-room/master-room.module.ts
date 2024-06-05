import { Module } from '@nestjs/common';
import { MasterRoomService } from './master-room.service';
import { MasterRoomController } from './master-room.controller';
import { PrismaModule } from '@inventory/share';

@Module({
  imports: [PrismaModule],
  controllers: [MasterRoomController],
  providers: [MasterRoomService]
})
export class MasterRoomModule {}
