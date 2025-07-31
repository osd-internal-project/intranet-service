import { PartialType } from '@nestjs/swagger';
import { CreateMasterProductImageDto } from './create-master-product-image.dto';

export class UpdateMasterProductImageDto extends PartialType(CreateMasterProductImageDto) {}
