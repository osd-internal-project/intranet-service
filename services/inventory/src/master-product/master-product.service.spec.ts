import { Test, TestingModule } from '@nestjs/testing';
import { MasterProductService } from './master-product.service';

describe('MasterProductService', () => {
  let service: MasterProductService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MasterProductService],
    }).compile();

    service = module.get<MasterProductService>(MasterProductService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
