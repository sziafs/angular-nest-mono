import { Injectable } from '@nestjs/common';
import { UserService } from 'src/users/shared/user.service';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService
    ) { }

    async validateUser(userEmail: string, userPassword: string) {
        const user = await this.userService.findByEmail(userEmail);
        if (user && user.password === userPassword) {
          const { id, name, email } = user;
          return { id, name, email };
        }
    
        return null;
      }
}
