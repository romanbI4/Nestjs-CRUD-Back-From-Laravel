import { Controller, Post, Body } from '@nestjs/common';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UsersService } from '../services/users.service';
import { Users } from '../entities/users.entity';
import { AuthUserDto } from '../dtos/auth-user.dto';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/user/register')
  register(@Body() createUserDto: CreateUserDto): Promise<object & Users> {
    return this.usersService.create(createUserDto);
  }

  @Post('/user/login')
  login(@Body() authUserDto: AuthUserDto) {
    return this.usersService.login(authUserDto);
  }
}
