import { Test, TestingModule } from '@nestjs/testing';
import { OrganizeChartService } from './organize-chart.service';

describe('OrganizeChartService', () => {
  let service: OrganizeChartService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrganizeChartService],
    }).compile();

    service = module.get<OrganizeChartService>(OrganizeChartService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
