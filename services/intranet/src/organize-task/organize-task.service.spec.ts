import { Test, TestingModule } from '@nestjs/testing';
import { OrganizeTaskService } from './organize-task.service';

describe('OrganizeTaskService', () => {
  let service: OrganizeTaskService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrganizeTaskService],
    }).compile();

    service = module.get<OrganizeTaskService>(OrganizeTaskService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
