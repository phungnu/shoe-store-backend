import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Shoe } from './shoe.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { ICreateShoe, IUpdateShoe, ShoeDTO, ShoeDTOCreate } from './shoe.type';
import { User } from 'src/user/user.entity';

@Injectable()
export class ShoeService {

    constructor(
        @InjectRepository(Shoe) private readonly ShoeRepo: Repository<Shoe>,
        @InjectRepository(User) private readonly UserRepo: Repository<User>
    ) {}

    async findAll(): Promise<Shoe[]> {
        return await this.ShoeRepo.find({
            relations: ['user']
        });
    }

    async findAllWithShoeBill(): Promise<Shoe[]>{
        return await this.ShoeRepo.find({
            relations: ['shoebills']
        })
    }
    
    async findById(id: number): Promise<any> {
        return await this.ShoeRepo.findOne({
            // select: {
            //     id: true,
            //     name: true
            // },
            where: {
                id: id,
            }
        });
    }

    async create(shoe: ICreateShoe): Promise<Shoe> {
        const user = await this.UserRepo.findOne({where: {id: shoe.userId}});
        const shoeDTO: ShoeDTOCreate = {
            name: shoe.name,
            description: shoe.description,
            price: shoe.price,
            cost: shoe.cost,
            quantity: shoe.quantity,
            imageUrl: shoe.imageUrl,
            user: user
        }
        return await this.ShoeRepo.save(shoeDTO);
    }

    async update(id: number, shoe: IUpdateShoe): Promise<UpdateResult> {
        return await this.ShoeRepo.update(id, shoe);
    }

    async delete(id: number): Promise<DeleteResult>{
        return await this.ShoeRepo.delete(id);
    }

}
