import { IsString, IsEmail, MinLength } from 'class-validator';

export class CreateUserDto {
    @IsString()
    @MinLength(1, { message: 'Name must be at least 1 character long' })
    name: string;
  
    @IsEmail({}, { message: 'Email must be a valid email address' })
    email: string;
}
