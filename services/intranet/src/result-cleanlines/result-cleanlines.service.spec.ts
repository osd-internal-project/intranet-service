import { Test, TestingModule } from '@nestjs/testing';
import { ResultCleanlinesService } from './result-cleanlines.service';

describe('ResultCleanlinesService', () => {
  let service: ResultCleanlinesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ResultCleanlinesService],
    }).compile();

    service = module.get<ResultCleanlinesService>(ResultCleanlinesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
