import { Module } from '@nestjs/common';
import { EmployeeProfileService } from './employee-profile.service';
import { EmployeeProfileController } from './employee-profile.controller';
import { PrismaModule } from '@inventory/share';

@Module({
  imports: [PrismaModule],
  controllers: [EmployeeProfileController],
  providers: [EmployeeProfileService],
})
export class EmployeeProfileModule {}
