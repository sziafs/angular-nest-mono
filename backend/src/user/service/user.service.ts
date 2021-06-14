import { from, Observable } from 'rxjs';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../models/user.entity';
import { User } from '../models/user.interface';
import { map, switchMap } from 'rxjs/operators';
import { AuthService } from 'src/auth/service/auth.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private authService: AuthService,
  ) {}

  findAll(): Observable<User[]> {
    return from(this.userRepository.find());
  }

  findOne(id: number): Observable<User> {
    return from(this.userRepository.findOne(id));
  }

  create(user: User): Observable<User> {
    return this.mailExists(user.email).pipe(
      switchMap((exists: boolean) => {
        if (!exists)
          return this.authService.hashPassword(user.password).pipe(
            switchMap((passwordHash: string) => {
              user.password = passwordHash;
              return from(this.userRepository.save(user)).pipe(
                map((savedUser: User) => {
                  const { ...user } = savedUser;
                  return user;
                }),
              );
            }),
          );

        throw new HttpException('Email already in use', HttpStatus.CONFLICT);
      }),
    );
  }

  update(id: number, user: User): Observable<any> {
    return from(this.userRepository.update(id, user));
  }

  remove(id: number): Observable<any> {
    return from(this.userRepository.delete(id));
  }

  findByEmail(email: string): Observable<User> {
    return from(
      this.userRepository.findOne(
        { email },
        { select: ['id', 'email', 'name', 'password'] },
      ),
    );
  }

  findUserByEmail(email: string): Promise<UserEntity> {
    return this.userRepository.findOne({
      where: {
        email,
      },
    });
  }

  private mailExists(email: string): Observable<boolean> {
    return from(this.userRepository.findOne({ email })).pipe(
      map((user: User) => {
        if (!user) return false;
        return true;
      }),
    );
  }
}
