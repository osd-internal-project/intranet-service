import { Module } from '@nestjs/common';
import { MaTypeService } from './ma-type.service';
import { MaTypeController } from './ma-type.controller';
import { PrismaModule } from '@inventory/share';

@Module({
  imports: [PrismaModule],
  controllers: [MaTypeController],
  providers: [MaTypeService],
})
export class MaTypeModule {}
