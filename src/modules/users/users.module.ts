import { Module } from '@nestjs/common';
import { UsersController } from './controllers/users.controller';
import { UsersService } from './services/users.service';
import { ExistsInRepositoryValidator } from './validators/exists-in-repository.validator';
import { Users } from './entities/users.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UniqueInRepositoryValidator } from './validators/unique-in-repository.validator';
import { AuthService } from '../auth/services/auth.service';
import { JwtService } from '@nestjs/jwt';
import { Companies } from '../companies/entities/companies.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Users, Companies])],
  controllers: [UsersController],
  providers: [
    UsersService,
    AuthService,
    JwtService,
    ExistsInRepositoryValidator,
    UniqueInRepositoryValidator,
  ],
  exports: [UsersService],
})
export class UsersModule {}
