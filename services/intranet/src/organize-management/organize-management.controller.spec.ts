import { Test, TestingModule } from '@nestjs/testing';
import { OrganizeManagementController } from './organize-management.controller';
import { OrganizeManagementService } from './organize-management.service';

describe('OrganizeManagementController', () => {
  let controller: OrganizeManagementController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrganizeManagementController],
      providers: [OrganizeManagementService],
    }).compile();

    controller = module.get<OrganizeManagementController>(OrganizeManagementController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
