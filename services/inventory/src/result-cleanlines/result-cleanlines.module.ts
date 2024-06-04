import { Module } from '@nestjs/common';
import { ResultCleanlinesService } from './result-cleanlines.service';
import { ResultCleanlinesController } from './result-cleanlines.controller';
import { PrismaModule } from '@inventory/share';

@Module({
  imports: [PrismaModule],
  controllers: [ResultCleanlinesController],
  providers: [ResultCleanlinesService],
})
export class ResultCleanlinesModule {}
