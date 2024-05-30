import { Module } from '@nestjs/common';
import { ResultCleanlinesService } from './result-cleanlines.service';
import { ResultCleanlinesController } from './result-cleanlines.controller';

@Module({
  controllers: [ResultCleanlinesController],
  providers: [ResultCleanlinesService]
})
export class ResultCleanlinesModule {}
