import { PartialType } from '@nestjs/swagger';
import { CreateRefugeDto } from './create-refuge.dto';

export class UpdateRefugeDto extends PartialType(CreateRefugeDto) {}
