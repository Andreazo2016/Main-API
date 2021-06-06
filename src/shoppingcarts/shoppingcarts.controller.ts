import {
  Controller,
  Delete,
  Get,
  HttpService,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Request } from 'express';
import { API_URL_MICROSERVICE } from '../constants/constants';

@Controller('shoppingcarts')
export class ShoppingcartsController {
  @UseGuards(JwtAuthGuard)
  @Get('/')
  async shoppingCart(@Req() request: Request) {
    const token = request.headers.authorization.replace('Bearer ', '');
    const httpService: HttpService = new HttpService();
    const headers = { Authorization: 'Bearer ' + token };

    const { data } = await httpService
      .get(API_URL_MICROSERVICE.SHOPPING_CART, { headers })
      .toPromise();

    return data;
  }

  @UseGuards(JwtAuthGuard)
  @Post('/product')
  async addProductToCart(@Req() request: Request) {
    const { productId, price } = request.body;
    const token = request.headers.authorization.replace('Bearer ', '');
    const httpService: HttpService = new HttpService();
    const headers = { Authorization: 'Bearer ' + token };

    const { data } = await httpService
      .post(
        API_URL_MICROSERVICE.INSERT_PRODUCT_TO_CART,
        { productId, price },
        { headers },
      )
      .toPromise();

    return data;
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/remove/product/:id')
  async removeProductFromCart(@Req() request: Request) {
    const { id } = request.params;
    const token = request.headers.authorization.replace('Bearer ', '');
    const httpService: HttpService = new HttpService();
    const headers = { Authorization: 'Bearer ' + token };

    const { data } = await httpService
      .delete(API_URL_MICROSERVICE.REMOVE_PRODUCT_FROM_CART + id, {
        headers,
      })
      .toPromise();

    return data;
  }
}
