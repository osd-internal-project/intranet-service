import { Test, TestingModule } from '@nestjs/testing';
import { MaCarTypeController } from './ma-car-type.controller';
import { MaCarTypeService } from './ma-car-type.service';

describe('MaCarTypeController', () => {
  let controller: MaCarTypeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MaCarTypeController],
      providers: [MaCarTypeService],
    }).compile();

    controller = module.get<MaCarTypeController>(MaCarTypeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
