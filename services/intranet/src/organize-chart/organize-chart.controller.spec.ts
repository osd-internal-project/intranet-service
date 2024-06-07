import { Test, TestingModule } from '@nestjs/testing';
import { OrganizeChartController } from './organize-chart.controller';
import { OrganizeChartService } from './organize-chart.service';

describe('OrganizeChartController', () => {
  let controller: OrganizeChartController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrganizeChartController],
      providers: [OrganizeChartService],
    }).compile();

    controller = module.get<OrganizeChartController>(OrganizeChartController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
