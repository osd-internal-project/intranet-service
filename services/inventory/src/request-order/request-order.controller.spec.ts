import { Test, TestingModule } from '@nestjs/testing';
import { RequestOrderController } from './request-order.controller';
import { RequestOrderService } from './request-order.service';

describe('RequestOrderController', () => {
  let controller: RequestOrderController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RequestOrderController],
      providers: [RequestOrderService],
    }).compile();

    controller = module.get<RequestOrderController>(RequestOrderController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
