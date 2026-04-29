import { Test, TestingModule } from '@nestjs/testing';
import { OrganizeManagementTaskController } from './organize-management-task.controller';
import { OrganizeManagementTaskService } from './organize-management-task.service';

describe('OrganizeManagementTaskController', () => {
  let controller: OrganizeManagementTaskController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrganizeManagementTaskController],
      providers: [OrganizeManagementTaskService],
    }).compile();

    controller = module.get<OrganizeManagementTaskController>(
      OrganizeManagementTaskController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
