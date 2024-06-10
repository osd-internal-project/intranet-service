import { PartialType } from '@nestjs/swagger';
import { CreateUserMapOrganizeDto } from './create-user-map-organize.dto';

export class UpdateUserMapOrganizeDto extends PartialType(CreateUserMapOrganizeDto) {}
