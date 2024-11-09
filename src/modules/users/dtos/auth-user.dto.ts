import { IsEmail, IsNotEmpty, IsString, Validate } from 'class-validator';
import { UniqueInRepositoryValidator } from '../validators/unique-in-repository.validator';

export class AuthUserDto {
  @IsEmail()
  @IsString()
  @IsNotEmpty()
  @Validate(UniqueInRepositoryValidator, ['email'])
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
