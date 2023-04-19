import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Shoe } from './shoe.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { ICreateShoe, IUpdateShoe } from './shoe.type';

@Injectable()
export class ShoeService {

    constructor(
        @InjectRepository(Shoe)
        private readonly ShoeRepo: Repository<Shoe>
    ) {}

    async findAll(): Promise<Shoe[]> {
        return await this.ShoeRepo.find();
    }

    async findAllWithShoeBill(): Promise<Shoe[]>{
        return await this.ShoeRepo.find({
            relations: ['shoebills']
        })
    }
    
    async findById(id: number): Promise<Shoe> {
        return await this.ShoeRepo.findOne({where: {id: id}})
    }

    async create(shoe: ICreateShoe): Promise<Shoe> {
        return await this.ShoeRepo.save(shoe);
    }

    async update(id: number, shoe: IUpdateShoe): Promise<UpdateResult> {
        return await this.ShoeRepo.update(id, shoe);
    }

    async delete(id: number): Promise<DeleteResult>{
        return await this.ShoeRepo.delete(id);
    }

}
