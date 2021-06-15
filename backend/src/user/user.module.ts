import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { UserService } from './service/user.service';
import { UserEntity } from './models/user.entity';
import { UserController } from './controller/user.controller';
import { AuthModule } from 'src/auth/auth.module';
import { UniqueCpfValidator } from './validators/custom.validator';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), AuthModule],
  providers: [UserService, UniqueCpfValidator],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
