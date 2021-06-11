import { LocalGuard } from './shared/local.guard';
import { Controller, UseGuards, Request, Post } from '@nestjs/common';

@Controller()
export class AuthController {
    @UseGuards(LocalGuard)
    @Post('auth/login')
    async login(@Request()req: any) {
        return req.user;
    }
}
