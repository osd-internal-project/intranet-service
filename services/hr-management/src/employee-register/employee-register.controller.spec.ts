import { Test, TestingModule } from '@nestjs/testing';
import { EmployeeRegisterController } from './employee-register.controller';
import { EmployeeRegisterService } from './employee-register.service';

describe('EmployeeRegisterController', () => {
  let controller: EmployeeRegisterController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmployeeRegisterController],
      providers: [EmployeeRegisterService],
    }).compile();

    controller = module.get<EmployeeRegisterController>(EmployeeRegisterController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
