import { AuthService } from '../service/auth.service';
import {
  Controller,
  Post,
  HttpCode,
  Body,
  UseGuards,
  Request,
} from '@nestjs/common';
import { User } from 'src/user/models/user.interface';
import { Observable } from 'rxjs';
import { LocalGuard } from '../guards/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // @Post('/login')
  // @UseGuards(LocalGuard)
  // @HttpCode(200)
  // login(@Body() loginUserDto: User): Observable<string> {
  //   return this.authService.login(loginUserDto);
  // }

  @UseGuards(LocalGuard)
  @Post('/login')
  async login(@Request() req: any) {
    return this.authService.login(req.user);
  }
}
