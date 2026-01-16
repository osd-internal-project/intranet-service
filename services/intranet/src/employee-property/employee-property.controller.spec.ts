import { Test, TestingModule } from '@nestjs/testing';
import { EmployeePropertyController } from './employee-property.controller';
import { EmployeePropertyService } from './employee-property.service';

describe('EmployeePropertyController', () => {
  let controller: EmployeePropertyController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmployeePropertyController],
      providers: [EmployeePropertyService],
    }).compile();

    controller = module.get<EmployeePropertyController>(EmployeePropertyController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
