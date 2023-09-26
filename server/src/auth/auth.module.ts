import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from '../users/user.module';
import { TokenModule } from '../token/token.module';

@Module({
  imports: [
    JwtModule.register({}),
    UserModule,
    TokenModule
  ],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
