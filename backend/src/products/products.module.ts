import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProductsController } from './products.controller';
import { ProductService } from './shared/product.service';
import { ProductEntity } from './product.entity';

@Module({
    imports: [TypeOrmModule.forFeature([ProductEntity])],
    controllers: [ProductsController],
    providers: [ProductService]
})
export class ProductsModule {}
