import { Module } from '@nestjs/common';
import { EmployeeRegisterService } from './employee-register.service';
import { EmployeeRegisterController } from './employee-register.controller';

@Module({
  controllers: [EmployeeRegisterController],
  providers: [EmployeeRegisterService]
})
export class EmployeeRegisterModule {}
