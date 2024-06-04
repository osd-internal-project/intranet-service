import { Test, TestingModule } from '@nestjs/testing';
import { ReportHouseKeeperController } from './report-house-keeper.controller';
import { ReportHouseKeeperService } from './report-house-keeper.service';

describe('ReportHouseKeeperController', () => {
  let controller: ReportHouseKeeperController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReportHouseKeeperController],
      providers: [ReportHouseKeeperService],
    }).compile();

    controller = module.get<ReportHouseKeeperController>(ReportHouseKeeperController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
