import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';
import { BeforeInsert } from 'typeorm';

export class CreateUserDto {
  @IsString()
  @Length(2, 255, { message: 'name length is wrong' })
  name: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;

  @Length(11)
  cpf: string;

  @BeforeInsert()
  emailToLowerCase() {
    this.email = this.email.toLowerCase();
  }
}
