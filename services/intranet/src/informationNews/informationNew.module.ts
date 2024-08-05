import { Module } from '@nestjs/common';
import { informationNewsService } from './informationNew.service';
import { InformationController } from './informationNew.controller';
import { PrismaModule } from '@inventory/share';

@Module({
  imports: [PrismaModule],
  controllers: [InformationController],
  providers: [informationNewsService],
})
export class MaCarWrapupModule {}
