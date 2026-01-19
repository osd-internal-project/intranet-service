import { PartialType } from '@nestjs/swagger';
import { CreateMistakesTypeDto } from './create-mistakes-type.dto';

export class UpdateMistakesTypeDto extends PartialType(CreateMistakesTypeDto) {}
