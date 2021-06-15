import { from, Observable } from 'rxjs';
import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../models/user.entity';
import { User } from '../models/user.interface';
import { map, switchMap } from 'rxjs/operators';
import { AuthService } from 'src/auth/service/auth.service';
import { CreateUserDto } from '../models/dto/CreateUser.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    private authService: AuthService,
  ) {}

  findAll(): Observable<User[]> {
    return from(this.userRepository.find());
  }

  findOne(id: number): Observable<User> {
    return from(this.userRepository.findOne(id));
  }

  create(createUserDto: CreateUserDto): Observable<User> {
    return this.userExists(createUserDto.email, createUserDto.cpf).pipe(
      switchMap((exists: boolean) => {
        if (!exists)
          return this.authService.hashPassword(createUserDto.password).pipe(
            switchMap((passwordHash: string) => {
              createUserDto.password = passwordHash;
              return from(this.userRepository.save(createUserDto)).pipe(
                map((savedUser: User) => {
                  const { ...user } = savedUser;
                  return user;
                }),
              );
            }),
          );

        throw new HttpException('User already exists', HttpStatus.CONFLICT);
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

  findByCpf(cpf: string): Observable<UserEntity> {
    return from(this.userRepository.findOne({ cpf }));
  }

  private userExists(email: string, cpf: string): Observable<boolean> {
    return from(
      this.userRepository.findOne({
        where: [{ cpf: cpf }, { email: email }],
      }),
    ).pipe(
      map((user: User) => {
        if (!user) return false;
        return true;
      }),
    );
  }
}
