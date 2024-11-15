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
import { DepartmentModule } from './department/department.module';
import { MasterRoomModule } from './master-room/master-room.module';
import { BookingRoomModule } from './booking-room/booking-room.module';
import { OrganizeChartModule } from './organize-chart/organize-chart.module';
import { MasterTypeLeaveModule } from './master-type-leave/master-type-leave.module';
import { MasterHolidaysModule } from './master-holidays/master-holidays.module';
import { MaTaskFilesModule } from './ma-task-files/ma-task-files.module';
import { UserMapOrganizeModule } from './user-map-organize/user-map-organize.module';
import { TpyeDataLeaveMapModule } from './tpye-data-leave-map/tpye-data-leave-map.module';
import { DataLeaveModule } from './data-leave/data-leave.module';
import { PublicizeSlideImagesModule } from './publicize-slide-images/publicize-slide-images.module';
import { DataLeaveFileModule } from './data-leave-file/data-leave-file.module';
import { MaCarModule } from './ma-car/ma-car.module';
import { MaCarTypeModule } from './ma-car-type/ma-car-type.module';
import { MaCarBookModule } from './ma-car-book/ma-car-book.module';
import { MaCarWrapupModule } from './ma-car-wrapup/ma-car-wrapup.module';
import { InformationNewsModule } from './informationNews/informationNews.module';
import { NewsImageModule } from './newsImage/newsImage.module';
import { NewsTypeModule } from './newsType/newsType.module';
import { PublicController } from './public/public.controller';
import { HandbooktypeModule } from './handbooktype/handbooktype.module';
import { SlideImageModule } from './slide-image/slide-image.module';
import { maCarWrapupImageModule } from './ma-car-wrapup-image/ma-car-wrapup-image';
import { handbookFileModule } from './handbookFile/handbookFile.module';
import { EmailTemplateModule } from './email-template/email-template.module';
import { EmailTemplateTypeModule } from './email-template-type/email-template-type.module';
import { EmailTemplateFieldsModule } from './email-template-fields/email-template-fields.module';
import { MasterHolidaysYearModule } from './master-holidays-year/master-holidays-year.module';
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [configs] }),
    HousekeeperModule,
    ResultCleanlinesModule,
    FloorModule,
    MaTaskModule,
    MaTypeModule,
    DepartmentModule,
    MasterRoomModule,
    BookingRoomModule,
    OrganizeChartModule,
    MasterTypeLeaveModule,
    MasterHolidaysModule,
    MaTaskFilesModule,
    UserMapOrganizeModule,
    TpyeDataLeaveMapModule,
    DataLeaveModule,
    PublicizeSlideImagesModule,
    DataLeaveFileModule,
    MaCarModule,
    MaCarTypeModule,
    MaCarBookModule,
    MaCarWrapupModule,
    InformationNewsModule,
    NewsImageModule,
    NewsTypeModule,
    HandbooktypeModule,
    SlideImageModule,
    maCarWrapupImageModule,
    handbookFileModule,
    EmailTemplateModule,
    EmailTemplateTypeModule,
    EmailTemplateFieldsModule,
    MasterHolidaysYearModule,
  ],
  controllers: [IntranetController, PublicController],
  providers: [IntranetService],
})
export class IntranetMainModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestLoggerMiddleware).forRoutes('*');
  }
}
