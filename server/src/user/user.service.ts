import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateUserDto } from './dtos/create-user.dto';
import { User, UserDocument } from './user.model';
import { UserDto } from './dtos/user-dto';

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

  async getCurrentUser(id: string): Promise<UserDto> {
    const user = await this.getUser('id', id);

    return {
      id: user.id,
      username: user.username,
      email: user.email
    };
  }
}
