import { PartialType } from '@nestjs/swagger';
import { CreateMasterRestaurantDto } from './create-master-restaurant.dto';

export class UpdateMasterRestaurantDto extends PartialType(CreateMasterRestaurantDto) {}
