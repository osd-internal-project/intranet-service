import { PartialType } from '@nestjs/swagger';
import { CreateTpyeDataLeaveMapDto } from './create-tpye-data-leave-map.dto';

export class UpdateTpyeDataLeaveMapDto extends PartialType(CreateTpyeDataLeaveMapDto) {}
