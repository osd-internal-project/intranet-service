import { PartialType } from '@nestjs/swagger';
import { CreateHousekeeperDto } from './create-housekeeper.dto';

export class UpdateHousekeeperDto extends PartialType(CreateHousekeeperDto) {}
