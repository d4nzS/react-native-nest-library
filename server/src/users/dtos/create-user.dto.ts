import { IsEmail, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @IsString()
  readonly username: string;

  @IsString()
  @IsEmail()
  readonly email: string;

  @IsString()
  @Length(8)
  readonly password: string;

  @IsString()
  @Length(8)
  readonly confirmPassword: string;
}
