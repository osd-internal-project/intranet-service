import { PartialType } from '@nestjs/swagger';
import { CreateEmployeePropertyDto } from './create-employee-property.dto';

export class UpdateEmployeePropertyDto extends PartialType(CreateEmployeePropertyDto) {}
