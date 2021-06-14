import { switchMap } from 'rxjs/operators';
import { from, Observable } from 'rxjs';
import {
  HttpException,
  Injectable,
  HttpStatus,
  forwardRef,
  Inject,
} from '@nestjs/common';
import { UserService } from 'src/user/service/user.service';
import { User } from 'src/user/models/user.interface';
import { JwtService } from '@nestjs/jwt';

const bcrypt = require('bcrypt');

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UserService))
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  hashPassword(password: string): Observable<string> {
    return from<string>(bcrypt.hash(password, 12));
  }

  comparePasswords(
    password: string,
    storedPasswordHash: string,
  ): Observable<any> {
    return from(bcrypt.compare(password, storedPasswordHash));
  }

  private validatePassword(
    password: string,
    storedPasswordHash: string,
  ): Observable<boolean> {
    return this.comparePasswords(password, storedPasswordHash);
  }

  async validateUser(userEmail: string, userPassword: string) {
    const user = await this.userService.findUserByEmail(userEmail);
    if (user && user.password === userPassword) {
      const { id, name, email } = user;
      return { id, name, email };
    }

    return null;
  }

  // login(loginUserDto: User): Observable<string> {
  //   return this.userService.findByEmail(loginUserDto.email).pipe(
  //     switchMap((user: User) => {
  //       if (user) {
  //         return this.validatePassword(
  //           loginUserDto.password,
  //           user.password,
  //         ).pipe(
  //           switchMap((passwordsMatches: boolean) => {
  //             if (passwordsMatches) {
  //               throw new HttpException(
  //                 'Login was successfull',
  //                 HttpStatus.ACCEPTED,
  //               );
  //             } else {
  //               throw new HttpException(
  //                 'Login was not successfull',
  //                 HttpStatus.UNAUTHORIZED,
  //               );
  //             }
  //           }),
  //         );
  //       } else {
  //         throw new HttpException('User not found', HttpStatus.NOT_FOUND);
  //       }
  //     }),
  //   );
  // }

  async login(user: any) {
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}