import { AuthService } from '../service/auth.service';
import { Controller, Post, HttpCode, Body } from '@nestjs/common';
import { User } from 'src/user/models/user.interface';
import { Observable } from 'rxjs';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post()
  @HttpCode(200)
  login(@Body() loginUserDto: User): Observable<string> {
    return this.authService.login(loginUserDto);
  }
}
