import { Module } from '@nestjs/common';
import { OrganizedService } from './organized.service';
import { OrganizedController } from './organized.controller';
import { PrismaModule } from '@inventory/share';

@Module({
  imports: [PrismaModule],
  controllers: [OrganizedController],
  providers: [OrganizedService],
})
export class OrganizedModule {}
