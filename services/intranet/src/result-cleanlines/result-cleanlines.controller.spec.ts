import { Test, TestingModule } from '@nestjs/testing';
import { ResultCleanlinesController } from './result-cleanlines.controller';
import { ResultCleanlinesService } from './result-cleanlines.service';

describe('ResultCleanlinesController', () => {
  let controller: ResultCleanlinesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ResultCleanlinesController],
      providers: [ResultCleanlinesService],
    }).compile();

    controller = module.get<ResultCleanlinesController>(ResultCleanlinesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
