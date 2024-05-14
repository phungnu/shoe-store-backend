import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ShoeBill } from './shoebill.entity';
import { Repository, DeleteResult, UpdateResult } from 'typeorm';
import { ICreateShoeBill, IShoeDTO } from './shoebill.type';
import { Shoe } from 'src/shoe/shoe.entity';
import { User } from 'src/user/user.entity';

@Injectable()
export class ShoebillService {
    constructor(
        @InjectRepository(ShoeBill) private readonly shoeBillRepo: Repository<ShoeBill>,
        @InjectRepository(Shoe) private readonly shoeRepo: Repository<Shoe>,
        @InjectRepository(User) private readonly userRepo: Repository<User>
    ){}
    
    async create(input: ICreateShoeBill): Promise<any>{
        const shoe = await this.shoeRepo.findOne({where: {id: input.shoeId}});
        const user = await this.userRepo.findOne({where: {id: input.userId}});
        const shoeBill: IShoeDTO = {
            amount: input.amount,
            size: input.size,
            shoe: shoe,
            user: user
        }
        return await this.shoeBillRepo.save(shoeBill);
    }

    async updateAmount(id: number, input: ICreateShoeBill): Promise<any> {
        const shoeBill = await this.shoeBillRepo.find({
            where: { 
                user: {id: input.userId}, 
                shoe: {id: input.shoeId} 
            },
            relations: ['bill', 'shoe']
        });
        let amount = 0;
        for ( const tmp of shoeBill ) {
            if ( tmp.bill == null) {
                amount = tmp.amount;
                break;
            }
        }
        return this.shoeBillRepo.update(id, {amount: amount + input.amount})
    }

    async delete(id: number): Promise<DeleteResult>{
        const shoeBill = await this.shoeBillRepo.findOne({
            where: {
                id: id,
            },
            relations: [
                'user', 'shoe', 'bill'
            ]
        });
        // if (shoeBill!==null) {
        //     const updateSold = await this.shoeRepo.update(shoeBill.shoe.id, {sold: shoeBill.shoe.sold - shoeBill.amount})
        // }
        return await this.shoeBillRepo.delete(id);
    }

    async findById(id: number): Promise<ShoeBill> {
        return await this.shoeBillRepo.findOne({
            where: {
                id: id,
            },
            relations: [
                'user', 'shoe'
            ]
        });
    }

    async findByUserShoe(userId: number, shoeId: number, size: number): Promise<ShoeBill[]> {
        return await this.shoeBillRepo.find({
            where: {
                size: size,
                user: {id: userId},
                shoe: {id: shoeId}
            },
            relations: [ 'user', 'shoe', 'bill' ]
        })
    }

    async findByUser(userId: number): Promise<ShoeBill[]> {
        return this.shoeBillRepo.find({
            where: {
                user: {id: userId}
            },
            relations: [
                'user', 'shoe'
            ]
        })
    }

    async findByUserinCart(userId: number): Promise<ShoeBill[]> {
        try {
            return this.shoeBillRepo.createQueryBuilder('shoeBill')
                                .leftJoinAndSelect('shoeBill.user', 'user')
                                .leftJoinAndSelect('shoeBill.shoe', 'shoe')
                                .leftJoinAndSelect('shoeBill.bill', 'bill')
                                .where('user.id = :userId', { userId })
                                .andWhere('bill_id IS NULL')
                                .getMany();
        }catch(err) {
            console.log(err)
        } 
    }

    async changeAmount(id: number, action: string):  Promise<UpdateResult> {
        try {
            const shoebill = await this.shoeBillRepo.findOne({where: {id: id}});
            var infoUpdate = {
                amount: 0
            }
            if ( action == 'plus' ) {
                infoUpdate.amount = shoebill.amount + 1;
            } else {
                infoUpdate.amount = shoebill.amount - 1;
            }
            return await this.shoeBillRepo.update(id, infoUpdate);
        } catch(err){
            console.log(err)
        }
    }

}
