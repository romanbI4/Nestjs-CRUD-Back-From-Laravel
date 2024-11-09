import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { UsersService } from '../../users/services/users.service';
import { JwtService } from '@nestjs/jwt';
import { AuthUserDto } from '../../users/dtos/auth-user.dto';
import * as bcrypt from 'bcrypt';
import { jwtConstants } from '../jwt/jwt.constants';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UsersService)) private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(authUserDto: AuthUserDto): Promise<any> {
    const user = await this.usersService.findOne('email', authUserDto.email);
    if (user && (await bcrypt.compare(authUserDto.password, user.password))) {
      const { ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload, {
        secret: jwtConstants.secret,
      }),
    };
  }
}
