import { Module } from '@nestjs/common';
import { EmployeePropertyService } from './employee-property.service';
import { EmployeePropertyController } from './employee-property.controller';
import { PrismaModule } from '@inventory/share';

@Module({
  imports: [PrismaModule],
  controllers: [EmployeePropertyController],
  providers: [EmployeePropertyService],
})
export class EmployeePropertyModule {}
