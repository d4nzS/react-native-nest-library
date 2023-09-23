import { BadRequestException, Injectable } from '@nestjs/common';
import { hash } from 'bcrypt';

import { CreateUserDto } from '../users/dtos/create-user.dto';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {
  }

  async registration(createUserDto: CreateUserDto) {
    const {
      username,
      email,
      password,
      confirmPassword
    } = createUserDto;

    const candidate = await this.usersService.getUser('username', username)
      ?? await this.usersService.getUser('email', email);

    if (candidate) {
      throw new BadRequestException('The user with this username or email already exists');
    }

    if (password !== confirmPassword) {
      throw new BadRequestException('The passwords are not similar');
    }

    const hashedPassword = await hash(password, 5);

    const user = await this.usersService.createUser({
      ...createUserDto,
      password: hashedPassword
    });

    console.log(user);
  }
}
