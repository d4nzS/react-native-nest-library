import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { BookController } from './book.controller';
import { BookService } from './book.service';
import { TokenModule } from '../token/token.module';
import { Book, BookSchema } from './book.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Book.name, schema: BookSchema }]),
    TokenModule
  ],
  controllers: [BookController],
  providers: [BookService]
})
export class BookModule {
}
