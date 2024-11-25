import { Test, TestingModule } from '@nestjs/testing';
import { EmployeeRegisterService } from './employee-register.service';

describe('EmployeeRegisterService', () => {
  let service: EmployeeRegisterService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EmployeeRegisterService],
    }).compile();

    service = module.get<EmployeeRegisterService>(EmployeeRegisterService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
