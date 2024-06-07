import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { IntranetController } from './app.controller';
import { IntranetService } from './app.service';
import configs from './configs';
import { RequestLoggerMiddleware } from './middleware/request-logger.middleware';
import { ResultCleanlinesModule } from './result-cleanlines/result-cleanlines.module';
import { HousekeeperModule } from './housekeeper/housekeeper.module';
import { FloorModule } from './floor/floor.module';
import { MaTaskModule } from './ma-task/ma-task.module';
import { MaTypeModule } from './ma-type/ma-type.module';
import { MasterRoomModule } from './master-room/master-room.module';
import { BookingRoomModule } from './booking-room/booking-room.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [configs] }),
    HousekeeperModule,
    ResultCleanlinesModule,
    FloorModule,
    MaTaskModule,
    MaTypeModule,
    MasterRoomModule,
    BookingRoomModule,
  ],
  controllers: [IntranetController],
  providers: [IntranetService],
})
export class IntranetMainModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestLoggerMiddleware).forRoutes('*');
  }
}
