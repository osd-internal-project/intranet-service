import { Module } from '@nestjs/common';
import { UsersService } from './id24users.service';
import { UsersController } from './id24users.controller';
import { PrismaModule } from '@inventory/share';
import { Id24Service } from 'src/id24/id24.service';
import { EmailTemplateService } from '../../../intranet/src/email-template/email-template.service';

@Module({
  imports: [PrismaModule],
  controllers: [UsersController],
  providers: [UsersService, Id24Service, EmailTemplateService],
})
export class UsersModule {}
