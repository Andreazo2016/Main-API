import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { ShoppingcartsModule } from './shoppingcarts/shoppingcarts.module';

@Module({
  imports: [TypeOrmModule.forRoot(), UsersModule, AuthModule, ProductsModule, ShoppingcartsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
