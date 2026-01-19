import { Test, TestingModule } from '@nestjs/testing';
import { ComplainProblemService } from './complain-problem.service';

describe('ComplainProblemService', () => {
  let service: ComplainProblemService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ComplainProblemService],
    }).compile();

    service = module.get<ComplainProblemService>(ComplainProblemService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
