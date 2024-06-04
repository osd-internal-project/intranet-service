import { Test, TestingModule } from '@nestjs/testing';
import { ReportHouseKeeperService } from './report-house-keeper.service';

describe('ReportHouseKeeperService', () => {
  let service: ReportHouseKeeperService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReportHouseKeeperService],
    }).compile();

    service = module.get<ReportHouseKeeperService>(ReportHouseKeeperService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
