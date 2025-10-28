import { Test, TestingModule } from '@nestjs/testing';
import { MaCarFilesController } from './ma-car-files.controller';
import { MaCarFilesService } from './ma-car-files.service';

describe('MaCarFilesController', () => {
  let controller: MaCarFilesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MaCarFilesController],
      providers: [MaCarFilesService],
    }).compile();

    controller = module.get<MaCarFilesController>(MaCarFilesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
