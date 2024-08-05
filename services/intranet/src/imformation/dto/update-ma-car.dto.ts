import { PartialType } from '@nestjs/swagger';
import { CreateinformaionNewsDto } from './create-ma-car.dto';

export class UpdateinformaionNewsDto extends PartialType(CreateinformaionNewsDto) {}
