import { Injectable } from '@nestjs/common';

import { CreateUserDto } from '../users/dtos/create-user.dto';

@Injectable()
export class AuthService {
  async registration(createUserDto: CreateUserDto) {
    
  }
}
