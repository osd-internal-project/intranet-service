import { Test, TestingModule } from '@nestjs/testing';
import { organizeManagementTaskService } from './organize-management-task.service';

describe('organizeManagementTaskService', () => {
  let service: organizeManagementTaskService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [organizeManagementTaskService],
    }).compile();

    service = module.get<organizeManagementTaskService>(
      organizeManagementTaskService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
