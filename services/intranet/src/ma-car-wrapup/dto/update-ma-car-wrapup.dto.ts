import { PartialType } from '@nestjs/swagger';
import { CreateMaCarWrapupDto } from './create-ma-car-wrapup.dto';

export class UpdateMaCarWrapupDto extends PartialType(CreateMaCarWrapupDto) {}
