import { Test, TestingModule } from '@nestjs/testing';
import { RequestOrderService } from './request-order.service';

describe('RequestOrderService', () => {
  let service: RequestOrderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RequestOrderService],
    }).compile();

    service = module.get<RequestOrderService>(RequestOrderService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
