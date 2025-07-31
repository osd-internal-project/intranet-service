import { Test, TestingModule } from '@nestjs/testing';
import { MasterProductController } from './master-product.controller';
import { MasterProductService } from './master-product.service';

describe('MasterProductController', () => {
  let controller: MasterProductController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MasterProductController],
      providers: [MasterProductService],
    }).compile();

    controller = module.get<MasterProductController>(MasterProductController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
