import { PartialType } from '@nestjs/swagger';
import { CreateDataLeaveFileDto } from './create-data-leave-file.dto';

export class UpdateDataLeaveFileDto extends PartialType(CreateDataLeaveFileDto) {}
