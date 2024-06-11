import { PartialType } from '@nestjs/swagger';
import { CreateMaTaskFileDto } from './create-ma-task-file.dto';

export class UpdateMaTaskFileDto extends PartialType(CreateMaTaskFileDto) {}
