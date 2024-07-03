import { PartialType } from '@nestjs/swagger';
import { CreateMaCarBookDto } from './create-ma-car-book.dto';

export class UpdateMaCarBookDto extends PartialType(CreateMaCarBookDto) {}
