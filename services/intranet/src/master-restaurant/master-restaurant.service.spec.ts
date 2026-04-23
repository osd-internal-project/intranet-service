import { Test, TestingModule } from '@nestjs/testing';
import { MasterRestaurantService } from './master-restaurant.service';

describe('MasterRestaurantService', () => {
  let service: MasterRestaurantService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MasterRestaurantService],
    }).compile();

    service = module.get<MasterRestaurantService>(MasterRestaurantService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
