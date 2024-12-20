import { Module } from '@nestjs/common';
import { VenderGroupService } from './vender-group.service';
import { VenderGroupController } from './vender-group.controller';
import { PrismaModule } from '@inventory/share';

@Module({
  imports: [PrismaModule],
  controllers: [VenderGroupController],
  providers: [VenderGroupService],
})
export class VenderGroupModule {}
