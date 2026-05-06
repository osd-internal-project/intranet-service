import { PartialType } from '@nestjs/swagger';
import { CreateMasterTypeEventDto } from './create-master-type-event.dto';

export class UpdateMasterTypeEventDto extends PartialType(CreateMasterTypeEventDto) {}
