import { Test, TestingModule } from '@nestjs/testing';
import { ReportDataLeaveController } from './report-data-leave.controller';
import { ReportDataLeaveService } from './report-data-leave.service';

describe('ReportDataLeaveController', () => {
  let controller: ReportDataLeaveController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReportDataLeaveController],
      providers: [ReportDataLeaveService],
    }).compile();

    controller = module.get<ReportDataLeaveController>(ReportDataLeaveController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
