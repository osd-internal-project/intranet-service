import { Module } from '@nestjs/common';
import { EmployeePropertyService } from './employee-property.service';
import { EmployeePropertyController } from './employee-property.controller';
import { PrismaModule } from '@inventory/share';
import { MinioClientModule } from 'src/minio-client/minio-client.module';

@Module({
  imports: [PrismaModule, MinioClientModule],
  controllers: [EmployeePropertyController],
  providers: [EmployeePropertyService],
})
export class EmployeePropertyModule {}
