import { Test, TestingModule } from '@nestjs/testing';
import { HousekeeperController } from './housekeeper.controller';
import { HousekeeperService } from './housekeeper.service';

describe('HousekeeperController', () => {
  let controller: HousekeeperController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HousekeeperController],
      providers: [HousekeeperService],
    }).compile();

    controller = module.get<HousekeeperController>(HousekeeperController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
