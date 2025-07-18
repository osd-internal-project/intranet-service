import { Test, TestingModule } from '@nestjs/testing';
import { ReportOtController } from './report-ot.controller';
import { ReportOtService } from './report-ot.service';

describe('ReportOtController', () => {
  let controller: ReportOtController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReportOtController],
      providers: [ReportOtService],
    }).compile();

    controller = module.get<ReportOtController>(ReportOtController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
