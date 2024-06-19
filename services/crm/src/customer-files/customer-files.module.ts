import { Module } from '@nestjs/common';
import { CustomerFilesService } from './customer-files.service';
import { CustomerFilesController } from './customer-files.controller';
import { PrismaModule } from '@inventory/share';

@Module({
  imports: [PrismaModule],
  controllers: [CustomerFilesController],
  providers: [CustomerFilesService],
})
export class CustomerFilesModule {}
