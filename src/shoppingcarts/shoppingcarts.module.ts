import { Module } from '@nestjs/common';
import { ShoppingcartsController } from './shoppingcarts.controller';

@Module({
  controllers: [ShoppingcartsController]
})
export class ShoppingcartsModule {}
