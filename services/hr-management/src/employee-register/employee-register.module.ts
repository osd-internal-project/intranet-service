import { Module } from '@nestjs/common';
import { EmployeeRegisterService } from './employee-register.service';
import { EmployeeRegisterController } from './employee-register.controller';
import { PrismaModule } from '@inventory/share';

@Module({
  imports: [PrismaModule],
  controllers: [EmployeeRegisterController],
  providers: [EmployeeRegisterService],
})
export class EmployeeRegisterModule {}
