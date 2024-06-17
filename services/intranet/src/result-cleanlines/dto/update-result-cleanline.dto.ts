import { PartialType } from '@nestjs/swagger';
import { CreateResultCleanlineDto } from './create-result-cleanline.dto';

export class UpdateResultCleanlineDto extends PartialType(
  CreateResultCleanlineDto,
) {}
