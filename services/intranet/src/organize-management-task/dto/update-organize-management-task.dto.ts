import { PartialType } from '@nestjs/swagger';
import { CreateOrganizeManagementDto } from './create-organize-management-task.dto';

export class UpdateOrganizeManagementDto extends PartialType(CreateOrganizeManagementDto) {}
