import { Controller, Get, Req, UseGuards } from '@nestjs/common';

import { AuthGuard } from '../auth/auth.guard';
import { UserService } from './user.service';

@Controller('users')
@UseGuards(AuthGuard)
export class UserController {
  constructor(private userService: UserService) {
  }

  @Get('me')
  getCurrentUser(@Req() request) {
    return this.userService.getCurrentUser(request.user._id);
  }
}
