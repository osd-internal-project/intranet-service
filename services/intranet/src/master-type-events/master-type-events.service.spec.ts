import { Test, TestingModule } from '@nestjs/testing';
import { MasterTypeEventsService } from './master-type-events.service';

describe('MasterTypeEventsService', () => {
  let service: MasterTypeEventsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MasterTypeEventsService],
    }).compile();

    service = module.get<MasterTypeEventsService>(MasterTypeEventsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
