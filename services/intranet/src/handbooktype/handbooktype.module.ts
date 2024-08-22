import { Module } from '@nestjs/common';
import { handbooktypeService } from './handbooktype.service';
import { handbooktypeController } from './handbooktype.controller';
import { PrismaModule } from '@inventory/share';

@Module({
  imports: [PrismaModule],
  controllers: [handbooktypeController],
  providers: [handbooktypeService],
})
export class HandbooktypeModule {}
