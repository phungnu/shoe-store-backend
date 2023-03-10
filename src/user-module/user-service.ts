import { IRegister, IUserDTO } from './user.type';
import { Injectable } from '@nestjs/common';
import { userDb } from 'src/database';

@Injectable()
export class UserService {

    async findAll(): Promise<any> {
        return await userDb;
    }

    async findByUsername(username: string): Promise<any> {
        const user = await userDb.find(user => user.username===username);
        return user;
    }

    async findById(id: number): Promise<any> {
        const user = await userDb.find(user => user.id==id);
        return user;
    }
    
    async create( data: IRegister): Promise<any> {
        const user: IUserDTO = {
            id: userDb[userDb.length-1].id + 1,
            username: data.username,
            password: data.password
        }
        await userDb.push(user);
    }

}
