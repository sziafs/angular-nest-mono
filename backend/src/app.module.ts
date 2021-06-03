import { Module } from '@nestjs/common';
import { ProductsModule } from './products/products.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';

import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    ProductsModule, 
    UsersModule,
    DatabaseModule
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {}
