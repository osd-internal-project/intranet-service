import { Test, TestingModule } from '@nestjs/testing';
import { MistakesTypeService } from './mistakes-type.service';

describe('MistakesTypeService', () => {
  let service: MistakesTypeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MistakesTypeService],
    }).compile();

    service = module.get<MistakesTypeService>(MistakesTypeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
