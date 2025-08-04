import { PartialType } from '@nestjs/swagger';
import { CreateOrderLotDto } from './create-order-lot.dto';

export class UpdateOrderLotDto extends PartialType(CreateOrderLotDto) {}
