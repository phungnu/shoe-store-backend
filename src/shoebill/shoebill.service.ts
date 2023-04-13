import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ShoeBill } from './shoebill.entity';
import { Repository } from 'typeorm';
import { ICreateShoeBill, IShoeDTO } from './shoebill.type';
import { Shoe } from 'src/shoe/shoe.entity';

@Injectable()
export class ShoebillService {
    constructor(
        @InjectRepository(ShoeBill) private readonly shoeBillRepo: Repository<ShoeBill>,
        @InjectRepository(Shoe) private readonly shoeRepo: Repository<Shoe>
    ){}
    
    async create(input: ICreateShoeBill): Promise<any>{
        const shoe = await this.shoeRepo.findOne({where: {id: input.shoeId}});
        const shoeBill: IShoeDTO = {
            quantity: input.quantity,
            shoe: shoe
        }
        return await this.shoeBillRepo.save(shoeBill);
    }

}
