import { Test, TestingModule } from '@nestjs/testing';
import { ReportMaController } from './report-ma.controller';
import { ReportMaService } from './report-ma.service';

describe('ReportMaController', () => {
  let controller: ReportMaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReportMaController],
      providers: [ReportMaService],
    }).compile();

    controller = module.get<ReportMaController>(ReportMaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
