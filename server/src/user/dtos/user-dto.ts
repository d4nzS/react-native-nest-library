import { IsEmail, IsString } from 'class-validator';

export class UserDto {
  @IsString()
  readonly id: string;

  @IsString()
  readonly username: string;

  @IsString()
  @IsEmail()
  readonly email: string;
}
