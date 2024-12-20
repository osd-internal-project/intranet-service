import { Module } from '@nestjs/common';
import { VenderTypeService } from './vender-type.service';
import { VenderTypeController } from './vender-type.controller';
import { PrismaModule } from '@inventory/share';

@Module({
  imports: [PrismaModule],
  controllers: [VenderTypeController],
  providers: [VenderTypeService],
})
export class VenderTypeModule {}
