import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

interface IUserRequest {
  name: string;
  email: string;
  password: string;
}

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
  ) { }
  async save({ name, email, password }: IUserRequest): Promise<User> {
    const hashPassword = await bcrypt.hash(password, 12);

    return this.usersRepository.save({ name, email, password: hashPassword });
  }

  async all(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async findByEmail(email: string): Promise<User> {
    return this.usersRepository.findOne({ email });
  }

  async delete(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
