import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from '../entities/users.entity';
import { AuthUserDto } from '../dtos/auth-user.dto';
import { CreateUserDto } from '../dtos/create-user.dto';
import * as bcrypt from 'bcrypt';
import { AuthService } from '../../auth/services/auth.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users) private userRepository: Repository<Users>,
    private authService: AuthService,
  ) {}

  async doesExist(fieldName: string, value: any): Promise<boolean> {
    const foundItem = this.userRepository.findOne({
      where: { [fieldName]: value },
    });

    return foundItem.then((foundItem) => !!foundItem);
  }

  async create(createUserDto: CreateUserDto): Promise<any> {
    createUserDto.password = await this.generateHashedPassword(
      createUserDto.password,
    );

    return await this.userRepository
      .save(createUserDto)
      .then((res: any) => res);
  }

  async login(authUserDto: AuthUserDto) {
    const user = await this.authService.validateUser(authUserDto);
    return await this.authService.login(user);
  }

  async findOne(fieldName: string, value: string) {
    return await this.userRepository.findOne({
      where: { [fieldName]: value },
    });
  }

  async generateHashedPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt();

    return await bcrypt.hash(password, salt);
  }

  async findById(id: number): Promise<Users> {
    return await this.userRepository.findOneBy({ id: id });
  }
}
