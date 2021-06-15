import { Observable } from 'rxjs';
import {
  Controller,
  Get,
  Post,
  Delete,
  Put,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { User } from '../models/user.interface';
import { UserService } from '../service/user.service';
import { JwtGuard } from 'src/auth/guards/jwt-auth.guard';
import { CreateUserDto } from '../models/dto/CreateUser.dto';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  @UseGuards(JwtGuard)
  findAll(): Observable<User[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtGuard)
  findOne(@Param('id') id: number): Observable<User> {
    return this.userService.findOne(id);
  }

  @Post()
  @UseGuards(JwtGuard)
  create(@Body() createUserDto: CreateUserDto): Observable<User> {
    return this.userService.create(createUserDto);
  }

  @Put(':id')
  @UseGuards(JwtGuard)
  update(@Param('id') id: number, @Body() user: User): Observable<User> {
    return this.userService.update(id, user);
  }

  @Delete(':id')
  @UseGuards(JwtGuard)
  remove(@Param('id') id: number) {
    this.userService.remove(id);
  }
}
