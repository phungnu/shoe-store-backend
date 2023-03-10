import { IRegister, ILogin, IUserDTO, IUserResponse } from './user.type';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { failResponse, successResponse} from 'src/utils/http';
import { UserService } from './user-service';
import { JwtService } from '@nestjs/jwt';

@Controller('users')
@ApiTags("Users")
export class UserControllerController {

    constructor ( 
        private readonly userService: UserService,
        private jwtService: JwtService
    ) {}

    @Get('/getAll')
    public async getAllUser() {
        try {
            const listUser =  await this.userService.findAll();
            if ( listUser==null ) {
                return failResponse('User is not found', 'UserNotFound');
            }
            return successResponse(listUser);
        }catch(error) {
            return failResponse('Execute service went wrong', 'ServiceException');
        }
    }

    @Post('/register')
    public async register(@Body() data: IRegister) {
        try {
            if ( !data.username && !data.password && !data.confirmPassword )
                return failResponse('Cần điền đầy đủ thông tin','FieldIsRequire');
            if ( data.password.length<6 )
                return failResponse('Mật khẩu tối thiểu 6 kí tự', 'ValidatePassword');
            if ( data.password!=data.confirmPassword ) 
                return failResponse('Mật khẩu không đúng với xác nhận', 'NotEqualConfirm');
            const userCheck = await this.userService.findByUsername(data.username);
            if ( userCheck ) 
                return failResponse('Username đã được đăng kí', 'UniqueUsername');
            await this.userService.create(data);
            const user = await this.userService.findByUsername(data.username);
            return successResponse(user);
        } catch(err) {
            return failResponse('Execute service went wrong', 'ServiceException');
        }
    }

    @Post('/login')
    public async login(@Body() input: ILogin) {
        try{
            if ( !input.password && !input.username ) 
                return failResponse('Cần điền đầy đủ thông tin','FieldIsRequire');
            const user: IUserDTO = await this.userService.findByUsername(input.username);
            if ( user==null || user.password!==input.password ) 
                return failResponse('Username hoặc mật khẩu không đúng', 'WrongCredentials');
            const payload = { username: user.username, sub: user.id, description: 'duong lau khong co nguoi yeu'};
            const accessToken = await this.jwtService.sign(payload);
            return successResponse( { id: user.id, username: user.username , accessToken } as IUserResponse );
        } catch(err) {
            return failResponse(`Execute service went wrong + ${err}`, 'ServiceException');
        }
    }

}
