import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { hash } from 'bcrypt';

import { CreateUserDto } from '../users/dtos/create-user.dto';
import { UsersService } from '../users/users.service';
import { User } from '../users/users.model';
import { Token } from './interfaces/token.interface';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService,
              private usersService: UsersService) {
  }

  async registration(createUserDto: CreateUserDto): Promise<Token> {
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

    return this.generateToken(user);
  }

  private async generateToken(user: User): Promise<Token> {
    const payload = { username: user.username, email: user.email };

    return { token: await this.jwtService.signAsync(payload) };
  }
}
