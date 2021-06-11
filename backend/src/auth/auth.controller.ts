import { LocalGuard } from './shared/local.guard';
import { Controller, UseGuards, Request, Post } from '@nestjs/common';
import { AuthService } from './shared/auth.service';

@Controller()
export class AuthController {

    constructor(
        private authService: AuthService
    ) { }

    @UseGuards(LocalGuard)
    @Post('auth/login')
    async login(@Request()req: any) {
        return this.authService.login(req.user);
    }
}
