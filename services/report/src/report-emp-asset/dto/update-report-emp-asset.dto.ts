import { PartialType } from '@nestjs/swagger';
import { CreateReportEmpAssetDto } from './create-report-emp-asset.dto';

export class UpdateReportEmpAssetDto extends PartialType(CreateReportEmpAssetDto) {}
