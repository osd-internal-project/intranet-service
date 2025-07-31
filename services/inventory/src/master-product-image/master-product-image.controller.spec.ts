import { Test, TestingModule } from '@nestjs/testing';
import { MasterProductImageController } from './master-product-image.controller';
import { MasterProductImageService } from './master-product-image.service';

describe('MasterProductImageController', () => {
  let controller: MasterProductImageController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MasterProductImageController],
      providers: [MasterProductImageService],
    }).compile();

    controller = module.get<MasterProductImageController>(MasterProductImageController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
