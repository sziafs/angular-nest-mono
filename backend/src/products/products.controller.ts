import { ProductService } from './shared/product.service';
import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { Product } from './shared/product';

@Controller('products')
export class ProductsController {

    constructor(
        private productService: ProductService
    ) {  }

    @Get()
    async findAll(): Promise<Product[]> {
        return this.productService.findAll()
    }

    @Get(':id')
    async findById(@Param('id') id: number): Promise<Product> {
        return this.productService.findById(id)
    }

    @Post()
    async create(@Body() product: Product): Promise<Product> {
        return this.productService.create(product)
    }

    @Put(':id')
    async update(@Param('id') id: number, @Body() product: Product): Promise<Product> {
        product.id = id
        return this.productService.update(product)
    }

    @Delete(':id')
    async delete(@Param('id') id: number) {
        this.productService.delete(id)
    }
}
