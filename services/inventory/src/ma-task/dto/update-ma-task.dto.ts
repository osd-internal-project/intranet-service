import { PartialType } from '@nestjs/swagger';
import { CreateMaTaskDto } from './create-ma-task.dto';

export class UpdateMaTaskDto extends PartialType(CreateMaTaskDto) {}
