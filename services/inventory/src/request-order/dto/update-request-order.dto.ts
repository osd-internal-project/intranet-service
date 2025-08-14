import { PartialType } from '@nestjs/swagger';
import { CreateRequestOrderDto } from './create-request-order.dto';

export class UpdateRequestOrderDto extends PartialType(CreateRequestOrderDto) {}
