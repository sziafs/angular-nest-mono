import { UserService } from './shared/user.service';
import { Body, Controller, Post, Get } from '@nestjs/common';
import { User } from './shared/user';
import UserEntity from './model/user.entity';

@Controller('users')
export class UsersController {

    constructor(
        private userService: UserService
    ) {  }

    @Get()
    async findAll(): Promise<UserEntity[]> {
        return await this.userService.findAll()
    }

    // @Get(':id')
    // async findById(@Param('id') id: number): Promise<Product> {
    //     return this.productService.findById(id)
    // }

    @Post()
    async create(@Body() user: User): Promise<UserEntity> {
        return await this.userService.create(user)
    }

    // @Put(':id')
    // async update(@Param('id') id: number, @Body() product: Product): Promise<Product> {
    //     product.id = id
    //     return this.productService.update(product)
    // }

    // @Delete(':id')
    // async delete(@Param('id') id: number) {
    //     this.productService.delete(id)
    // }
}
