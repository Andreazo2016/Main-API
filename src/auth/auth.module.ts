import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { UsersModule } from './../users/users.module';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import JwtConfig from './config/jwt';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      secret: JwtConfig.secret,
      signOptions: { expiresIn: JwtConfig.expiresIn },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule { }
