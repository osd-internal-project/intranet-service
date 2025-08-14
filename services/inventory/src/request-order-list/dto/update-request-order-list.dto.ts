import { PartialType } from '@nestjs/swagger';
import { CreateRequestOrderListDto } from './create-request-order-list.dto';

export class UpdateRequestOrderListDto extends PartialType(CreateRequestOrderListDto) {}
