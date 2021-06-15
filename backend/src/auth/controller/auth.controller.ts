import { AuthService } from '../service/auth.service';
import { Controller, Post, HttpCode, UseGuards } from '@nestjs/common';
import { User } from 'src/user/models/user.interface';
import { LocalGuard } from '../guards/local-auth.guard';
import { CurrentUser } from '../decorators/current-user.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalGuard)
  @HttpCode(200)
  @Post('login')
  async login(@CurrentUser() user: User) {
    return {
      userId: user.id,
      token: await this.authService.getTokenForUser(user),
    };
  }
}
