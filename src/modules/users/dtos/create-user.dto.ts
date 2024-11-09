import { IsEmail, IsNotEmpty, IsString, Validate } from 'class-validator';
import { ExistsInRepositoryValidator } from '../validators/exists-in-repository.validator';

export class CreateUserDto {
  @IsEmail()
  @IsString()
  @IsNotEmpty()
  @Validate(ExistsInRepositoryValidator, ['email'])
  email: string;

  @IsNotEmpty()
  @IsString()
  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  @IsString()
  @IsNotEmpty()
  first_name: string;

  @IsNotEmpty()
  @IsString()
  last_name: string;

  @IsNotEmpty()
  @IsString()
  @Validate(ExistsInRepositoryValidator, ['phone'])
  phone: string;
}
