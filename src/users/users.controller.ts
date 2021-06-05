import { Controller, Get, Post, Req, Delete, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { Request } from 'express';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) { }
  @Post('/')
  async save(@Req() request: Request) {
    const data = request.body;
    const user = await this.userService.save(data);
    return user;
  }

  @Get('/')
  async all() {
    const users = this.userService.all();
    return users;
  }

  @Delete('/:id')
  async delete(@Param() params) {
    const { id } = params;
    await this.userService.delete(id);
    return `removed with successfull`;
  }
}
