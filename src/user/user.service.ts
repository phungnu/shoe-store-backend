import { Injectable } from '@nestjs/common';
import { User } from './user.entity' 
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateResult, DeleteResult } from  'typeorm';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly UserRepo: Repository<User>,
    ) {}

    async findAll (): Promise<User[]> {
        return await this.UserRepo.find();
    }

    async findOne (id: number): Promise<User> {
        return await this.UserRepo.findOne({where: { id: id }});
    }


    async create (user: User): Promise<User> {
        return await this.UserRepo.save(user)
    }

    async update(user: User): Promise<UpdateResult> {
        return await this.UserRepo.update(user.id, user);
    }

    async delete(id: number): Promise<DeleteResult> {
        return await this.UserRepo.delete(id);
    }

    async findByUsername(username: string): Promise<User> {
        return await this.UserRepo.findOne({where: {username: username}})
    }
}

