import { Test, TestingModule } from '@nestjs/testing';
import { EmployeePropertyService } from './employee-property.service';

describe('EmployeePropertyService', () => {
  let service: EmployeePropertyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EmployeePropertyService],
    }).compile();

    service = module.get<EmployeePropertyService>(EmployeePropertyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
