import { PartialType } from '@nestjs/swagger';
import { CreateMasterHolidaysYearDto } from './create-master-holidays-year.dto';

export class UpdateMasterHolidaysYearDto extends PartialType(CreateMasterHolidaysYearDto) {}
