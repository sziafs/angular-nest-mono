import { User } from './user';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import UserEntity from '../model/user.entity';

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(UserEntity)
        private userRepository: Repository<UserEntity>
    ) { }

    async findAll(): Promise<UserEntity[]> {
        return await this.userRepository.find()
    }

    // findById(id: number) {
    //     const item = this.users.find((item) => item.id == id)
    //     return item
    // }

    async create(user: User): Promise<UserEntity> {
        return await this.userRepository.save(user)
    }

    // update(product: Product) {
    //     const item = this.findById(product.id)

    //     if (item) {
    //         item.name = product.name
    //         item.price = product.price
    //     }

    //     return item
    // }

    // delete(id: number) {
    //     const itemIndex = this.users.findIndex((item) => item.id == id)
    //     this.users.splice(itemIndex, 1)
    // }
}
