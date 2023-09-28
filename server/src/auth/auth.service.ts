import { BadRequestException, Get, Injectable, UnauthorizedException, UseGuards } from '@nestjs/common';
import { compare, hash } from 'bcrypt';

import { CreateUserDto } from '../user/dtos/create-user.dto';
import { UserService } from '../user/user.service';
import { UserDocument } from '../user/user.model';
import { TokensDto } from '../token/dtos/tokens.dto';
import { LoginUserDto } from '../user/dtos/login-user.dto';
import { TokenService } from '../token/token.service';
import { AuthGuard } from './auth.guard';

@Injectable()
export class AuthService {
  constructor(private userService: UserService,
              private tokenService: TokenService) {
  }

  async registration(createUserDto: CreateUserDto): Promise<TokensDto> {
    const {
      username,
      email,
      password,
      confirmPassword
    } = createUserDto;

    const candidate = await this.userService.getUser('username', username)
      ?? await this.userService.getUser('email', email);

    if (candidate) {
      throw new BadRequestException('The user with this username or email already exists');
    }

    if (password !== confirmPassword) {
      throw new BadRequestException('The passwords are not similar');
    }

    const hashedPassword = await hash(password, 5);

    const user = await this.userService.createUser({
      ...createUserDto,
      password: hashedPassword
    });
    const tokens = await this.tokenService.generateTokens({
      id: user.id,
      username: user.username,
      email: user.email
    });

    await this.tokenService.saveRefreshToken(user.id, tokens.refreshToken);

    return tokens;
  }

  async login(loginUserDto: LoginUserDto): Promise<TokensDto> {
    const user = await this.validateUser(loginUserDto);
    const tokens = await this.tokenService.generateTokens({
      id: user.id,
      username: user.username,
      email: user.email
    })

    await this.tokenService.saveRefreshToken(user.id, tokens.refreshToken);

    return tokens;
  }

  async logout(refreshToken: string) {
    await this.tokenService.removeRefreshToken(refreshToken);

    return { refreshToken };
  }

  async refresh(refreshToken: string): Promise<TokensDto> {
    const userData = await this.tokenService.validateRefreshToken(refreshToken);

    if (!userData) {
      throw new UnauthorizedException();
    }

    const tokenFromDb = await this.tokenService.findRefreshToken(refreshToken);

    if (!tokenFromDb) {
      throw new UnauthorizedException();
    }

    const user = await this.userService.getUser('_id', userData.id);

    if (!user) {
      throw new UnauthorizedException();
    }

    return await this.tokenService.generateTokens({
      id: user.id,
      username: user.username,
      email: user.email
    });
  };

  private async validateUser({ username, password }: LoginUserDto): Promise<UserDocument> {
    const user = await this.userService.getUser('username', username);

    if (!user) {
      throw new UnauthorizedException('The user with this username does not exist');
    }

    const arePasswordsEqual = await compare(password, user.password);

    if (!arePasswordsEqual) {
      throw new UnauthorizedException('The passwords are not similar');
    }

    return user;
  }
}
