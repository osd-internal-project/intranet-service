import { PartialType } from '@nestjs/swagger';
import { CreateMaCarDto } from './create-ma-car.dto';

export class UpdateMaCarDto extends PartialType(CreateMaCarDto) {}
