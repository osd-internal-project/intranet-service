import { PartialType } from '@nestjs/swagger';
import { CreateEmployeePropertyDto } from './create-employee-property.dto';

export class UpdateEmployeePropertyDto {
  type?: string;
  name?: string;
  nameOther?: string | null;
  brand?: string;
  serial?: string;
  assetNumber?: string;
  address?: string;
  common?: string | null;
  assetStatus?: string;
  pathImage?: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
}
