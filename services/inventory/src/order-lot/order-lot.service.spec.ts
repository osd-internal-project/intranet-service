import { Test, TestingModule } from '@nestjs/testing';
import { OrderLotService } from './order-lot.service';

describe('OrderLotService', () => {
  let service: OrderLotService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrderLotService],
    }).compile();

    service = module.get<OrderLotService>(OrderLotService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
