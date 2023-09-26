import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { TokensDto } from './dtos/tokens.dto';
import { Token, TokenDocument } from './token.model';
import { TokenUserDto } from '../users/dtos/token-user.dto';

@Injectable()
export class TokenService {
  constructor(private jwtService: JwtService,
              @InjectModel(Token.name) private tokenModel: Model<Token>) {
  }

  async generateTokens(payload: TokenUserDto): Promise<TokensDto> {
    const accessToken = await this.jwtService.signAsync(payload, {
      secret: process.env.JWT_ACCESS_SECRET,
      expiresIn: process.env.JWT_ACCESS_EXPIRATION
    });

    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: process.env.JWT_REFRESH_SECRET,
      expiresIn: process.env.JWT_REFRESH_EXPIRATION
    });

    return { accessToken, refreshToken };
  }

  async saveRefreshToken(userId: string, refreshTokenToSave: string): Promise<Token> {
    const refreshToken = await this.tokenModel.create({
      user: userId,
      refreshToken: refreshTokenToSave
    });

    return refreshToken.save();
  }

  async validateAccessToken(accessToken: string) {
    try {
      return this.jwtService.verifyAsync(accessToken, {
        secret: process.env.JWT_ACCESS_SECRET
      });
    } catch {
      throw new UnauthorizedException();
    }
  }

  async validateRefreshToken(refreshToken: string): Promise<TokenUserDto> {
    try {
      return await this.jwtService.verifyAsync(refreshToken, {
        secret: process.env.JWT_REFRESH_SECRET
      });
    } catch {
      throw new UnauthorizedException();
    }
  }

  async findRefreshToken(refreshToken: string): Promise<TokenDocument | null> {
    return this.tokenModel.findOne({ refreshToken });
  }

  async removeRefreshToken(refreshToken: string) {
    return this.tokenModel.deleteOne({ refreshToken });
  }
}
