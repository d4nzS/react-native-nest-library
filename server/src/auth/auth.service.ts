import { Injectable } from '@nestjs/common';

import { CreateUserDto } from '../users/dtos/create-user.dto';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {
  }

  async registration(createUserDto: CreateUserDto) {
  }
}
