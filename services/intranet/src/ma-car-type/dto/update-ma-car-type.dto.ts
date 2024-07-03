import { PartialType } from '@nestjs/swagger';
import { CreateMaCarTypeDto } from './create-ma-car-type.dto';

export class UpdateMaCarTypeDto extends PartialType(CreateMaCarTypeDto) {}
