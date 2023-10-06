import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';


import { UserService } from './user.service';
import { User, UserSchema } from './user.model';
import { UserController } from './user.controller';

import { TokenModule } from '../token/token.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema }
    ]),
    TokenModule,
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService]
})
export class UserModule {}
