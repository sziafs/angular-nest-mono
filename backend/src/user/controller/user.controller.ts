import { UpdateUserDto } from './../models/dto/UpdateUser.dto';
import { Observable } from 'rxjs';
import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  UseGuards,
  ParseIntPipe,
  Patch,
  HttpCode,
} from '@nestjs/common';
import { User } from '../models/user.interface';
import { UserService } from '../service/user.service';
import { JwtGuard } from 'src/auth/guards/jwt-auth.guard';
import { CreateUserDto } from '../models/dto/CreateUser.dto';

@Controller('users')
@UseGuards(JwtGuard)
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  findAll(): Observable<User[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Observable<User> {
    return this.userService.findOne(id);
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto): Observable<User> {
    return this.userService.create(createUserDto);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ): Observable<string> {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id', ParseIntPipe) id: number) {
    this.userService.remove(id);
  }
}
