import { Controller, Get, Req, UseGuards, HttpService } from '@nestjs/common';
import { Request } from 'express';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { API_URL_MICROSERVICE } from '../constants/constants';

@Controller('products')
export class ProductsController {
  @UseGuards(JwtAuthGuard)
  @Get('/')
  async list(@Req() request: Request) {
    const token = request.headers.authorization.replace('Bearer ', '');
    const httpService: HttpService = new HttpService();
    const headers = { Authorization: 'Bearer ' + token };

    const { data } = await httpService
      .get(API_URL_MICROSERVICE.LIST_PRODUCTS, { headers })
      .toPromise();

    return data;
  }
}
