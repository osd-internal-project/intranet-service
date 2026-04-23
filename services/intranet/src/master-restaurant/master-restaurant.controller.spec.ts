import { Test, TestingModule } from '@nestjs/testing';
import { MasterRestaurantController } from './master-restaurant.controller';
import { MasterRestaurantService } from './master-restaurant.service';

describe('MasterRestaurantController', () => {
  let controller: MasterRestaurantController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MasterRestaurantController],
      providers: [MasterRestaurantService],
    }).compile();

    controller = module.get<MasterRestaurantController>(MasterRestaurantController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
