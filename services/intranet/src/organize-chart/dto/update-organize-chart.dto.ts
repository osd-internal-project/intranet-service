import { PartialType } from '@nestjs/swagger';
import { CreateOrganizeChartDto } from './create-organize-chart.dto';

export class UpdateOrganizeChartDto extends PartialType(CreateOrganizeChartDto) {}
