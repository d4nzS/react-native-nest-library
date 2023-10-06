import { Controller, Get, UseGuards } from '@nestjs/common';

import { BookService } from './book.service';
import { AuthGuard } from '../auth/auth.guard';
import { BookDocument } from './book.model';

@Controller('books')
@UseGuards(AuthGuard)
export class BookController {
  constructor(private bookService: BookService) {
  }

  @Get()
  getAll(): Promise<BookDocument[]> {
    return this.bookService.getAll();
  }
}
