import { Test, TestingModule } from '@nestjs/testing';
import { OrderLotController } from './order-lot.controller';
import { OrderLotService } from './order-lot.service';

describe('OrderLotController', () => {
  let controller: OrderLotController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderLotController],
      providers: [OrderLotService],
    }).compile();

    controller = module.get<OrderLotController>(OrderLotController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
