import { Body, Controller, Get, Param, Post } from '@nestjs/common';

import { AuthService } from './auth.service';
import { CreateUserDto } from '../user/dtos/create-user.dto';
import { TokensDto } from '../token/dtos/tokens.dto';
import { LoginUserDto } from '../user/dtos/login-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {
  }

  @Post('registration')
  registration(@Body() createUserDto: CreateUserDto): Promise<TokensDto> {
    return this.authService.registration(createUserDto);
  }

  @Post('login')
  login(@Body() userDto: LoginUserDto): Promise<TokensDto> {
    return this.authService.login(userDto);
  }

  @Post('logout')
  logout(@Body('refreshToken') refreshToken: string): Promise<{ refreshToken: string }> {
    return this.authService.logout(refreshToken);
  }

  @Post('refresh')
  refreshToken(@Body('refreshToken') refreshToken: string): Promise<TokensDto> {
    return this.authService.refresh(refreshToken);
  }
}
