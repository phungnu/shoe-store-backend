import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { UserService } from './user.service'
import { User } from './user.entity'
import { ApiTags } from '@nestjs/swagger';
import { failResponse, successResponse } from 'src/utils/http';
import { ILogin, IUserDTO } from './user.type';


@Controller('users')
@ApiTags("Users")
export class UserController {
    constructor(
        private readonly userService: UserService
    ){}

    @Post('/login')
    async login(@Body() input: ILogin): Promise<any> {
        try {
            if ( !input.username || !input.password ) 
                return failResponse('Cần điền đầy đủ thông tin', 'FieldIsRequired');
            const user: IUserDTO = await this.userService.findByUsername(input.username);
            if (user==null || user.password !== input.password)
                return failResponse('Username hoặc password không đúng', 'WrongCredentials');
            return successResponse(user);
        } catch(error) {    
            return failResponse('Execute service went wrong', 'ServiceException');
        }
    }

    @Get('/getAll')
    async findAll(): Promise<any> {
        try {
            const listUser = await this.userService.findAll();
            if ( listUser==null ) {
                return failResponse('User is not found', 'UserNotFound');
            }
            return successResponse(listUser);
        } catch(error) {
            return failResponse('Execute service went wrong', 'ServiceException');
        }
        
    }

    @Get('/{id}')
    async get(@Param('id') id: number): Promise<any> {
        try {
            const user = await this.userService.findOne(id);
            if ( user==null ) {
                return failResponse('User is not found', 'UserNotFound');
            }
            return successResponse(user);
        } catch(error) {
            return failResponse('Execute service went wrong', 'ServiceException');
        }

    }

    @Put()
    update(@Body() user: User) {
        return this.userService.update(user);
    }

    @Delete(':id')
    deleteUser(@Param() params) {
        return this.userService.delete(params.id);
    }
}

