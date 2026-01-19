import { PartialType } from '@nestjs/swagger';
import { CreateComplainProblemDto } from './create-complain-problem.dto';

export class UpdateComplainProblemDto extends PartialType(CreateComplainProblemDto) {}
