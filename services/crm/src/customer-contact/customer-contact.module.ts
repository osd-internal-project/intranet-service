import { Module } from '@nestjs/common';
import { CustomerContactService } from './customer-contact.service';
import { CustomerContactController } from './customer-contact.controller';
import { PrismaModule } from '@inventory/share';

@Module({
  imports: [PrismaModule],
  controllers: [CustomerContactController],
  providers: [CustomerContactService],
})
export class CustomerContactModule {}
