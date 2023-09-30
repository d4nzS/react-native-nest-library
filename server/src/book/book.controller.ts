import { Controller, Get, UseGuards } from '@nestjs/common';

import { BookService } from './book.service';
import { AuthGuard } from '../auth/auth.guard';

@Controller('books')
@UseGuards(AuthGuard)
export class BookController {
  constructor(private bookService: BookService) {
  }

  @Get()
  getAll() {
    return this.bookService.getAll();
  }
}
