import { PartialType } from '@nestjs/swagger';
import { CreateReportHouseKeeperDto } from './create-report-house-keeper.dto';

export class UpdateReportHouseKeeperDto extends PartialType(CreateReportHouseKeeperDto) {}
