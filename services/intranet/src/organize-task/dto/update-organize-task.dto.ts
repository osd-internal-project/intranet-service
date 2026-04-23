import { PartialType } from '@nestjs/swagger';
import { CreateOrganizeTaskDto } from './create-organize-task.dto';

export class UpdateOrganizeTaskDto extends PartialType(CreateOrganizeTaskDto) {}
