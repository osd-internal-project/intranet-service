import { PartialType } from '@nestjs/swagger';
import { CreateMasterHolidayDto } from './create-master-holiday.dto';

export class UpdateMasterHolidayDto extends PartialType(CreateMasterHolidayDto) {}
