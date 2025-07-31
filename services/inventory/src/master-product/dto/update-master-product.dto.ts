import { PartialType } from '@nestjs/swagger';
import { CreateMasterProductDto } from './create-master-product.dto';

export class UpdateMasterProductDto extends PartialType(CreateMasterProductDto) {}
