import { Test, TestingModule } from '@nestjs/testing';
import { MasterTypeEventsController } from './master-type-events.controller';
import { MasterTypeEventsService } from './master-type-events.service';

describe('MasterTypeEventsController', () => {
  let controller: MasterTypeEventsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MasterTypeEventsController],
      providers: [MasterTypeEventsService],
    }).compile();

    controller = module.get<MasterTypeEventsController>(MasterTypeEventsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
