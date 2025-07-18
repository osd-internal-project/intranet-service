import { Test, TestingModule } from '@nestjs/testing';
import { ReportOtService } from './report-ot.service';

describe('ReportOtService', () => {
  let service: ReportOtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReportOtService],
    }).compile();

    service = module.get<ReportOtService>(ReportOtService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
