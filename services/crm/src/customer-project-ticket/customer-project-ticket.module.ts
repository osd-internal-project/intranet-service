import { Module } from '@nestjs/common';
import { CustomerProjectTicketService } from './customer-project-ticket.service';
import { CustomerProjectTicketController } from './customer-project-ticket.controller';
import { PrismaModule } from '@inventory/share';

@Module({
  imports: [PrismaModule],
  controllers: [CustomerProjectTicketController],
  providers: [CustomerProjectTicketService],
})
export class CustomerProjectTicketModule {}
