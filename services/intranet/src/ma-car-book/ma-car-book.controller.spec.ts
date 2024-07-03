import { Test, TestingModule } from '@nestjs/testing';
import { MaCarBookController } from './ma-car-book.controller';
import { MaCarBookService } from './ma-car-book.service';

describe('MaCarBookController', () => {
  let controller: MaCarBookController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MaCarBookController],
      providers: [MaCarBookService],
    }).compile();

    controller = module.get<MaCarBookController>(MaCarBookController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
