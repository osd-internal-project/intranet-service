import { Test, TestingModule } from '@nestjs/testing';
import { MistakesTypeController } from './mistakes-type.controller';
import { MistakesTypeService } from './mistakes-type.service';

describe('MistakesTypeController', () => {
  let controller: MistakesTypeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MistakesTypeController],
      providers: [MistakesTypeService],
    }).compile();

    controller = module.get<MistakesTypeController>(MistakesTypeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
