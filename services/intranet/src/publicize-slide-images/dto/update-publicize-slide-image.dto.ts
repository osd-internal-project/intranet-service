import { PartialType } from '@nestjs/swagger';
import { CreatePublicizeSlideImageDto } from './create-publicize-slide-image.dto';

export class UpdatePublicizeSlideImageDto extends PartialType(CreatePublicizeSlideImageDto) {}
