import { Injectable } from '@nestjs/common';

import { CreateUserDto } from './dtos/create-user.dto';

@Injectable()
export class UsersService {
  async create(createUserDto: CreateUserDto) {

  }

  async getUserByEmail(email: string) {

  }

  async getUserByUsername(username: string) {

  }
}
