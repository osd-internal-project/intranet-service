import { Test, TestingModule } from '@nestjs/testing';
import { ReportMaService } from './report-ma.service';

describe('ReportMaService', () => {
  let service: ReportMaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReportMaService],
    }).compile();

    service = module.get<ReportMaService>(ReportMaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
