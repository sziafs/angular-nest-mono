import { ProductEntity } from './../product.entity';
import { Product } from './product';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ProductService {

    constructor(
        @InjectRepository(ProductEntity)
        private productsRepository: Repository<ProductEntity>
    ) {}

    findAll(): Promise<ProductEntity[]> {
        return this.productsRepository.find()
    }

    findOne(id: number) {
        return this.productsRepository.findOne(id)
    }

    async create(product: Product): Promise<ProductEntity> {
        const newProduct = this.productsRepository.create(product)
        await this.productsRepository.save(newProduct)
        return newProduct
    }

    async update(productData: Product): Promise<ProductEntity> {
        const product = await this.findOne(productData.id)

        if (productData) {
            product.name = productData.name
            product.price = productData.price
        }

        await this.productsRepository.save(product)

        return product
    }

    async remove(id: number) {
        await this.productsRepository.delete(id)
    }
}
