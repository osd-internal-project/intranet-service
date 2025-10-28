import { PartialType } from '@nestjs/swagger';
import { CreateMaCarFileDto } from './create-ma-car-file.dto';

export class UpdateMaCarFileDto extends PartialType(CreateMaCarFileDto) {}
