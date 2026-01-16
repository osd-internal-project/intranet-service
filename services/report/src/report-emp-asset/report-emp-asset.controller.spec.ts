import { Test, TestingModule } from '@nestjs/testing';
import { ReportEmpAssetController } from './report-emp-asset.controller';
import { ReportEmpAssetService } from './report-emp-asset.service';

describe('ReportEmpAssetController', () => {
  let controller: ReportEmpAssetController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReportEmpAssetController],
      providers: [ReportEmpAssetService],
    }).compile();

    controller = module.get<ReportEmpAssetController>(ReportEmpAssetController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
