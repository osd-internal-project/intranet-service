import { PartialType } from '@nestjs/swagger';
import { CreateEmployeeRegisterDto } from './create-employee-register.dto';

export class UpdateEmployeeRegisterDto extends PartialType(CreateEmployeeRegisterDto) {}
