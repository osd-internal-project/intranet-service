import { Test, TestingModule } from '@nestjs/testing';
import { ReportDataLeaveService } from './report-data-leave.service';

describe('ReportDataLeaveService', () => {
  let service: ReportDataLeaveService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReportDataLeaveService],
    }).compile();

    service = module.get<ReportDataLeaveService>(ReportDataLeaveService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
