import { Test, TestingModule } from '@nestjs/testing';
import { RequestOrderListService } from './request-order-list.service';

describe('RequestOrderListService', () => {
  let service: RequestOrderListService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RequestOrderListService],
    }).compile();

    service = module.get<RequestOrderListService>(RequestOrderListService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
