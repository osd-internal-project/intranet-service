import { Module } from '@nestjs/common';
import { MistakesTypeService } from './mistakes-type.service';
import { MistakesTypeController } from './mistakes-type.controller';
import { PrismaModule } from '@inventory/share';

@Module({
  imports: [PrismaModule],
  controllers: [MistakesTypeController],
  providers: [MistakesTypeService],
})
export class MistakesTypeModule {}
