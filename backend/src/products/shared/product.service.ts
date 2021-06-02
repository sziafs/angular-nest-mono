import { Product } from './product';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductService {
    products: Product[] = [
        {
            "id": 1,
            "name": "Caneta BIC Preta",
            "price": 5.89
        },
        {
            "id": 2,
            "name": "Notebook Mac Pro",
            "price": 12000.89
        },
        {
            "id": 3,
            "name": "Sansung S20+ Ultra",
            "price": 7520.89
        },
        {
            "id": 4,
            "name": "Lapis Preto Básico",
            "price": 1.50
        }
    ]

    findAll(): Product[] {
        return this.products
    }

    findById(id: number) {
        const item = this.products.find((item) => item.id == id)
        return item
    }

    create(product: Product): Product {
        this.products.push(product)
        return product
    }

    update(product: Product) {
        const item = this.findById(product.id)

        if (item) {
            item.name = product.name
            item.price = product.price
        }

        return item
    }

    delete(id: number) {
        const itemIndex = this.products.findIndex((item) => item.id == id)
        this.products.splice(itemIndex, 1)
    }
}
