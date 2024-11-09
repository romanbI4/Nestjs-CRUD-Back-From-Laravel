import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from './services/auth.service';
import { JwtStrategy } from './jwt/jwt.strategy';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      signOptions: { expiresIn: '60s' },
    }),
  ],
  providers: [JwtStrategy, JwtService, AuthService],
  exports: [AuthService],
})
export class AuthModule {}
