import { Test, TestingModule } from '@nestjs/testing';
import { MaCarWrapupController } from './ma-car-wrapup.controller';
import { MaCarWrapupService } from './ma-car-wrapup.service';

describe('MaCarWrapupController', () => {
  let controller: MaCarWrapupController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MaCarWrapupController],
      providers: [MaCarWrapupService],
    }).compile();

    controller = module.get<MaCarWrapupController>(MaCarWrapupController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
