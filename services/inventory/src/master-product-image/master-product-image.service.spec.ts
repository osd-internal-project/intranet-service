import { Test, TestingModule } from '@nestjs/testing';
import { MasterProductImageService } from './master-product-image.service';

describe('MasterProductImageService', () => {
  let service: MasterProductImageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MasterProductImageService],
    }).compile();

    service = module.get<MasterProductImageService>(MasterProductImageService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
