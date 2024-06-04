import { PartialType } from '@nestjs/swagger';
import { CreateMaTypeDto } from './create-ma-type.dto';

export class UpdateMaTypeDto extends PartialType(CreateMaTypeDto) {}
