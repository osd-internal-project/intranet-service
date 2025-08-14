import { Test, TestingModule } from '@nestjs/testing';
import { RequestOrderListController } from './request-order-list.controller';
import { RequestOrderListService } from './request-order-list.service';

describe('RequestOrderListController', () => {
  let controller: RequestOrderListController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RequestOrderListController],
      providers: [RequestOrderListService],
    }).compile();

    controller = module.get<RequestOrderListController>(RequestOrderListController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
