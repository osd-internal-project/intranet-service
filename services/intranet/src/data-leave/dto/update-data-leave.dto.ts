import { PartialType } from '@nestjs/swagger';
import { CreateDataLeaveDto } from './create-data-leave.dto';

export class UpdateDataLeaveDto extends PartialType(CreateDataLeaveDto) {}
