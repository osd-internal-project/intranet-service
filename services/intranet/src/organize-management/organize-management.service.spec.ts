import { Test, TestingModule } from '@nestjs/testing';
import { OrganizeManagementService } from './organize-management.service';

describe('OrganizeManagementService', () => {
  let service: OrganizeManagementService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrganizeManagementService],
    }).compile();

    service = module.get<OrganizeManagementService>(OrganizeManagementService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
