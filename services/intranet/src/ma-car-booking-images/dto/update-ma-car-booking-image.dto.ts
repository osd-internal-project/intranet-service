import { PartialType } from '@nestjs/swagger';
import { CreateMaCarBookingImageDto } from './create-ma-car-booking-image.dto';

export class UpdateMaCarBookingImageDto extends PartialType(CreateMaCarBookingImageDto) {}
