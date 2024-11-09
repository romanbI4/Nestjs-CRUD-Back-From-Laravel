import { Injectable } from '@nestjs/common';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import { UsersService } from '../services/users.service';

@Injectable()
@ValidatorConstraint({ name: 'uniqueInRepository', async: true })
export class UniqueInRepositoryValidator
  implements ValidatorConstraintInterface
{
  constructor(private readonly usersService: UsersService) {}

  async validate(value: any, args: ValidationArguments) {
    const [field] = args.constraints;
    return await this.usersService.doesExist(field, value);
  }

  defaultMessage(args: ValidationArguments) {
    const [field] = args.constraints;
    return `${field} not exists in the repository.`;
  }
}
