import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) { }
  @Post('/authenticate')
  async login(
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    const authUser = await this.authService.authenticate(email, password);
    return authUser;
  }
}
