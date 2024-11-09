import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Companies } from '../entities/companies.entity';

@Injectable()
export class CompaniesService {
  constructor(
    @InjectRepository(Companies)
    private readonly companiesRepository: Repository<Companies>,
  ) {}

  async getList(userId: number): Promise<Companies[]> {
    return await this.companiesRepository.find({
      where: { ['user_id']: userId },
    });
  }

  async create(): Promise<any> {
    return await this.companiesRepository.save([]).then((res: any) => res);
  }

  async findOne(fieldName: string, value: string) {
    return await this.companiesRepository.findOne({
      where: { [fieldName]: value },
    });
  }

  async findById(id: number): Promise<Companies> {
    return await this.companiesRepository.findOneBy({ id: id });
  }
}
