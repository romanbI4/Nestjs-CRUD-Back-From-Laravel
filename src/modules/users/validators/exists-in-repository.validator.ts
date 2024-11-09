import { Injectable } from '@nestjs/common';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import { UsersService } from '../services/users.service';

@Injectable()
@ValidatorConstraint({ name: 'existsInRepository', async: true })
export class ExistsInRepositoryValidator
  implements ValidatorConstraintInterface
{
  constructor(private readonly usersService: UsersService) {}

  async validate(value: any, args: ValidationArguments) {
    const [field] = args.constraints;
    return !(await this.usersService.doesExist(field, value));
  }

  defaultMessage(args: ValidationArguments) {
    const [field] = args.constraints;
    return `${field} already exists in the repository.`;
  }
}
