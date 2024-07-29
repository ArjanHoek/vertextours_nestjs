import { IsIn, IsNotEmpty, MinLength } from 'class-validator';
import { User } from 'src/entities';

const countries = ['AT', 'DE', 'IT', 'FR', 'CH'];

export class CreateRefugeDto {
  @MinLength(10)
  name: string;

  @IsIn(countries)
  country: string;

  @IsNotEmpty()
  owner: User;
}
