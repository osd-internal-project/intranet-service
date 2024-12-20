import { Module } from '@nestjs/common';
import { VenderService } from './vender.service';
import { VenderController } from './vender.controller';
import { PrismaModule } from '@inventory/share';

@Module({
  imports: [PrismaModule],
  controllers: [VenderController],
  providers: [VenderService],
})
export class VenderModule {}
