import { User } from './user';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import { UserEntity } from '../model/user.entity';

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(UserEntity)
        private usersRepository: Repository<UserEntity>
    ) { }

    findAll(): Promise<UserEntity[]> {
        return this.usersRepository.find()
    }

    findOne(id: number) {
        return this.usersRepository.findOne(id);
    }

    async create(user: User): Promise<UserEntity> {
        const newUser = this.usersRepository.create(user)
        await this.usersRepository.save(newUser)
        return newUser
    }

    // update(product: Product) {
    //     const item = this.findById(product.id)

    //     if (item) {
    //         item.name = product.name
    //         item.price = product.price
    //     }

    //     return item
    // }

    async remove(id: number) {
        await this.usersRepository.delete(id);
    }
}
