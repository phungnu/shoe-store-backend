import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { UserService } from './user.service'
import { User } from './user.entity'


@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {

    }

    @Get()
    findAll(): Promise<User[]> {
        return this.userService.findAll()
    }

    @Get(':id')
    get(@Param() params) {
        return this.userService.findOne(params.id);
    }

    @Post()
    create(@Body() task: User) {
        return this.userService.create(task);
    }

    @Put()
    update(@Body() task: User) {
        return this.userService.update(task);
    }

    @Delete(':id')
    deleteUser(@Param() params) {
        return this.userService.delete(params.id);
    }
}

