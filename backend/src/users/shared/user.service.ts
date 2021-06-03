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

    async update(userData: User): Promise<UserEntity> {
        const user = await this.findOne(userData.id)

        if (userData) {
            user.name = userData.name
            user.email = userData.email
            user.phone = userData.phone
            user.password = userData.password
        }
        
        await this.usersRepository.save(user)
        
        return user
    }

    async remove(id: number) {
        await this.usersRepository.delete(id);
    }
}
