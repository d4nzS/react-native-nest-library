import { Body, Controller, Get, Patch, Req, UseGuards } from '@nestjs/common';

import { AuthGuard } from '../auth/auth.guard';
import { UserService } from './user.service';
import { UserDto } from './dtos/user-dto';
import { UserDocument } from './user.model';
import { EditUserDto } from './dtos/edit-user.dto';

@Controller('users')
@UseGuards(AuthGuard)
export class UserController {
  constructor(private userService: UserService) {
  }

  @Get('me')
  getCurrentUser(@Req() request): Promise<UserDto> {
    return this.userService.getCurrentUser(request.user.id);
  }

  @Patch('edit')
  editCredentials(
    @Req() request,
    @Body() editUserDto: EditUserDto
  ): Promise<UserDocument> {
    return this.userService.editCredentials(request.user.id, editUserDto);
  }
}
