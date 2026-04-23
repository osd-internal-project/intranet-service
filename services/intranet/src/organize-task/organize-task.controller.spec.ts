import { Test, TestingModule } from '@nestjs/testing';
import { OrganizeTaskController } from './organize-task.controller';
import { OrganizeTaskService } from './organize-task.service';

describe('OrganizeTaskController', () => {
  let controller: OrganizeTaskController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrganizeTaskController],
      providers: [OrganizeTaskService],
    }).compile();

    controller = module.get<OrganizeTaskController>(OrganizeTaskController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
