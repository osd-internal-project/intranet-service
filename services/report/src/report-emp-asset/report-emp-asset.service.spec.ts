import { Test, TestingModule } from '@nestjs/testing';
import { ReportEmpAssetService } from './report-emp-asset.service';

describe('ReportEmpAssetService', () => {
  let service: ReportEmpAssetService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReportEmpAssetService],
    }).compile();

    service = module.get<ReportEmpAssetService>(ReportEmpAssetService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
