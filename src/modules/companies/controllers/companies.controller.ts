import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/jwt/jwt-auth.guard';
import { CompaniesService } from '../services/companies.service';
import { Companies } from '../entities/companies.entity';

@Controller()
export class CompaniesController {
  constructor(private readonly companiesService: CompaniesService) {}

  @UseGuards(JwtAuthGuard)
  @Get('/user/companies')
  index(@Req() req: any): Promise<Companies[]> {
    return this.companiesService.getList(req.user.userId);
  }
}
