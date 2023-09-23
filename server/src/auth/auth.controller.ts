import { Body, Controller, Post } from '@nestjs/common';

import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dtos/create-user.dto';
import { Token } from './interfaces/token.interface';
import { UserDto } from '../users/dtos/user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {
  }

  @Post('registration')
  registration(@Body() createUserDto: CreateUserDto): Promise<Token> {
    return this.authService.registration(createUserDto);
  }

  @Post('login')
  login(@Body() userDto: UserDto): Promise<Token> {
    return this.authService.login(userDto);
  }
}
