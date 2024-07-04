import { Test, TestingModule } from '@nestjs/testing';
import { MaCarController } from './ma-car.controller';
import { MaCarService } from './ma-car.service';

describe('MaCarController', () => {
  let controller: MaCarController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MaCarController],
      providers: [MaCarService],
    }).compile();

    controller = module.get<MaCarController>(MaCarController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
