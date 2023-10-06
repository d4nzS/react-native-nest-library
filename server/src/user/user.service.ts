import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { hash } from 'bcrypt';

import { CreateUserDto } from './dtos/create-user.dto';
import { User, UserDocument } from './user.model';
import { UserDto } from './dtos/user-dto';
import { EditUserDto } from './dtos/edit-user.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {
  }

  async createUser(createUserDto: CreateUserDto): Promise<UserDocument> {
    const createdUser = new this.userModel(createUserDto);

    return createdUser.save();
  }

  async getUser(prop: keyof UserDocument, value: string): Promise<UserDocument> {
    return this.userModel.findOne({ [prop]: value });
  }

  async getCurrentUser(userId: string): Promise<UserDto> {
    const user = await this.getUser('_id', userId);

    return {
      id: user.id,
      username: user.username,
      email: user.email
    };
  }

  async editCredentials(userId: string, editUserDto: EditUserDto): Promise<UserDocument> {
    const {
      username,
      email,
      password,
      confirmPassword
    } = editUserDto;
    const user = await this.getUser('_id', userId);

    if (username !== user.username && await this.getUser('username', username)) {
      throw new BadRequestException('The user with this username already exists');
    }

    if (email !== user.email && await this.getUser('email', email)) {
      throw new BadRequestException('The user with this email already exists');
    }

    if (password !== confirmPassword) {
      throw new BadRequestException('The passwords are not similar');
    }

    if (username) {
      user.username = username;
    }

    if (email) {
      user.email = email;
    }

    if (password) {
      user.password = await hash(password, 5);
    }

    return user.save();
  }
}
