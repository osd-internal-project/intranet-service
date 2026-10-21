import configs from './configs';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { IntranetController } from './app.controller';
import { IntranetService } from './app.service';
import { RequestLoggerMiddleware } from './middleware/request-logger.middleware';
import { ResultCleanlinesModule } from './result-cleanlines/result-cleanlines.module';
import { HousekeeperModule } from './housekeeper/housekeeper.module';
import { FloorModule } from './floor/floor.module';
import { MaTaskModule } from './ma-task/ma-task.module';
import { MaTypeModule } from './ma-type/ma-type.module';
import { DepartmentModule } from './department/department.module';
import { MasterRoomModule } from './master-room/master-room.module';
import { BookingRoomModule } from './booking-room/booking-room.module';
import { MasterRefreshmentModule } from './master-refreshment/master-refreshment.module';
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
import { NotiLogsModule } from './noti-logs/noti-logs.module';
import { MasterConfigOvertimeModule } from './master-config-ot/master-config-ot.module';
import { OvertimeModule } from './overtime/overtime.module';
import { MaCarBookingImagesModule } from './ma-car-booking-images/ma-car-booking-images.module';
import { MasterProvinceThailandModule } from './master-province-thailand/master-province-thailand.module';
import { MaCarFilesModule } from './ma-car-files/ma-car-files.module';
import { MaCarImageModule } from './ma-car-image/ma-car-image.module';
import { EmployeePropertyModule } from './employee-property/employee-property.module';
import { MistakesTypeModule } from './mistakes-type/mistakes-type.module';
import { ComplainProblemModule } from './complain-problem/complain-problem.module';
import { MinioClientModule } from './minio-client/minio-client.module';
import { ScheduleModule } from '@nestjs/schedule';
import { OrganizeManagementTaskModule } from './organize-management-task/organize-management-task.module';
import { OrganizeTaskModule } from './organize-task/organize-task.module';
import { MasterRestaurantModule } from './master-restaurant/master-restaurant.module';
import { OrganizeManagementModule } from './organize-management/organize-management.module';
import { MasterTypeEventsModule } from './master-type-events/master-type-events.module';
import { MaCarFuelTransactionModule } from './ma-car-fuel-transaction/ma-car-fuel-transaction.module';
import { MaCarDocumentModule } from './ma-car-document/ma-car-document.module';
import { MaVehicleTypeModule } from './ma-vehicle-type/ma-vehicle-type.module';
import { MaVehicleTypeGroupModule } from './ma-vehicle-type-group/ma-vehicle-type-group.module';
import { CarActivityLogModule } from './car-activity-log/car-activity-log.module';
import { MaCarDashboardModule } from './ma-car-dashboard/ma-car-dashboard.module';
import { MaCarReportModule } from './ma-car-report/ma-car-report.module';
import { MailTestModule } from './mail-test/mail-test.module';
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
    MasterRefreshmentModule,
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
    MaCarFuelTransactionModule,
    MaCarDocumentModule,
    MaVehicleTypeModule,
    MaVehicleTypeGroupModule,
    CarActivityLogModule,
    MaCarDashboardModule,
    MaCarReportModule,
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
    NotiLogsModule,
    MasterConfigOvertimeModule,
    OvertimeModule,
    MaCarBookingImagesModule,
    MasterProvinceThailandModule,
    MaCarFilesModule,
    MaCarImageModule,
    EmployeePropertyModule,
    MistakesTypeModule,
    ComplainProblemModule,
    MinioClientModule,
    ScheduleModule.forRoot(),
    OrganizeManagementTaskModule,
    OrganizeTaskModule,
    MasterRestaurantModule,
    OrganizeManagementModule,
    MasterTypeEventsModule,
    MailTestModule,
  ],
  controllers: [IntranetController, PublicController],
  providers: [IntranetService],
})
export class IntranetMainModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestLoggerMiddleware).forRoutes('*');
  }
}
