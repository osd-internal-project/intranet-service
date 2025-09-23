import { Test, TestingModule } from '@nestjs/testing';
import { MasterProvinceThailandController } from './master-province-thailand.controller';
import { MasterProvinceThailandService } from './master-province-thailand.service';

describe('MasterProvinceThailandController', () => {
  let controller: MasterProvinceThailandController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MasterProvinceThailandController],
      providers: [MasterProvinceThailandService],
    }).compile();

    controller = module.get<MasterProvinceThailandController>(MasterProvinceThailandController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
