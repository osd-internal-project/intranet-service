import { Test, TestingModule } from '@nestjs/testing';
import { MasterProvinceThailandService } from './master-province-thailand.service';

describe('MasterProvinceThailandService', () => {
  let service: MasterProvinceThailandService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MasterProvinceThailandService],
    }).compile();

    service = module.get<MasterProvinceThailandService>(
      MasterProvinceThailandService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
