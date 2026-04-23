import { Module } from '@nestjs/common';
import { MasterRestaurantService } from './master-restaurant.service';
import { MasterRestaurantController } from './master-restaurant.controller';
import { PrismaModule } from '@inventory/share';
import { MinioClientModule } from 'src/minio-client/minio-client.module';

@Module({
  imports: [PrismaModule, MinioClientModule],
  controllers: [MasterRestaurantController],
  providers: [MasterRestaurantService],
})
export class MasterRestaurantModule {}
