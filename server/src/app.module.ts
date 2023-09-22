import { Module } from '@nestjs/common';

import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`
    }),
    MongooseModule.forRoot(
      `mongodb+srv://${process.env.MONGO_USERNMA}:${process.env.MONGO_PASSWORD}@cluster0.ct19jhx.mongodb.net/`
    ),
    AuthModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
