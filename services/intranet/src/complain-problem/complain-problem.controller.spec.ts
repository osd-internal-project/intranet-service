import { Test, TestingModule } from '@nestjs/testing';
import { ComplainProblemController } from './complain-problem.controller';
import { ComplainProblemService } from './complain-problem.service';

describe('ComplainProblemController', () => {
  let controller: ComplainProblemController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ComplainProblemController],
      providers: [ComplainProblemService],
    }).compile();

    controller = module.get<ComplainProblemController>(ComplainProblemController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
