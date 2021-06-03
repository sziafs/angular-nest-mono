import { UserService } from './shared/user.service';
import { Body, Controller, Post, Get, Param, Delete } from '@nestjs/common';
import { User } from './shared/user';
import { UserEntity } from './model/user.entity';

@Controller('users')
export class UsersController {

    constructor(
        private userService: UserService
    ) {  }

    @Get()
    async findAll(): Promise<UserEntity[]> {
        return await this.userService.findAll()
    }

    @Get(':id')
    async findByOne(@Param('id') id: number): Promise<UserEntity> {
        return this.userService.findOne(id)
    }

    @Post()
    async create(@Body() user: User): Promise<UserEntity> {
        return await this.userService.create(user)
    }

    // @Put(':id')
    // async update(@Param('id') id: number, @Body() product: Product): Promise<Product> {
    //     product.id = id
    //     return this.productService.update(product)
    // }

    @Delete(':id')
    async remove(@Param('id') id: number) {
        this.userService.remove(id)
    }
}
