import { PartialType } from '@nestjs/swagger';
import { CreateMasterProvinceThailandDto } from './create-master-province-thailand.dto';

export class UpdateMasterProvinceThailandDto extends PartialType(CreateMasterProvinceThailandDto) {}
