import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Bill } from './bill.entity';
import { Repository, UpdateResult } from 'typeorm';
import { ICreateBill } from './bill.type';
import { Shoe } from 'src/shoe/shoe.entity';
import { ShoeBill } from 'src/shoebill/shoebill.entity';
import { User } from 'src/user/user.entity';

@Injectable()
export class BillService {
    constructor(
        @InjectRepository(Bill) private readonly billRepo: Repository<Bill>,
        @InjectRepository(Shoe) private readonly shoeRepo: Repository<Shoe>,
        @InjectRepository(ShoeBill) private readonly shoeBillRepo: Repository<ShoeBill>,
        @InjectRepository(User) private readonly userRepo: Repository<User>,
    ){}

    async findAll(): Promise<Bill[]> {
        return await this.billRepo.find({
            relations: ['user', 'shoebills', 'shoebills.shoe']
        });
    }

    async findById(id: number): Promise<Bill>{
        return await this.billRepo.findOne({where: {id: id}})
    }

    async findByUser(userId: number): Promise<Bill[]>{
        return this.billRepo.find({
            where: {
                user: {id: userId}
            },
            relations: ['user', 'shoebills', 'shoebills.shoe']
        })
    }

    async createBill(input: ICreateBill): Promise<any>{
        try {
            let user = await this.userRepo.findOne({where: {id: input.userId}})
            const bill = this.billRepo.create({
                user: user,
                status: 0,
                message: input.message,
                address: input.address
            });
            const billAns = await this.billRepo.save(bill);
    
            for ( const shoebillReq of input.shoeBills ) {
                const shoebill = await this.shoeBillRepo.findOne({where: {id: shoebillReq}, relations: ['shoe']});
                await this.shoeBillRepo.update(shoebill.id, {bill: billAns})
                await this.shoeRepo.update(shoebill.shoe.id, {quantity: shoebill.shoe.quantity - shoebill.amount})
            }
            return billAns;
        } catch(err) {
            console.log(err)
        }
        
    }

    async updateStatus(id: number, status: number):  Promise<UpdateResult> {
        try {
            const bill = await this.billRepo.findOne({where: {id: id}});
            var infoUpdate = {
                status: status
            }
            return await this.billRepo.update(id, infoUpdate);
        } catch(err){
            console.log(err)
        }
    }
}
