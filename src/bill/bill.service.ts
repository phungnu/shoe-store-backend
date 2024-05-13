import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Bill } from './bill.entity';
import { Repository } from 'typeorm';
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
            relations: ['shoebills', 'shoebills.shoe']
        });
    }

    async findById(id: number): Promise<Bill>{
        return await this.billRepo.findOne({where: {id: id}})
    }

    async createBill(input: ICreateBill): Promise<any>{
        try {
            let user = await this.userRepo.findOne({where: {id: input.userId}})
            const bill = this.billRepo.create({
                user: user,
            });
            const billAns = await this.billRepo.save(bill);
    
            for ( const bookbillReq of input.shoeBills ) {
                const bookbill = await this.shoeBillRepo.findOne({where: {id: bookbillReq}, relations: ['book']});
                await this.shoeBillRepo.update(bookbill.id, {bill: billAns})
                await this.shoeRepo.update(bookbill.book.id, {sold: bookbill.book.sold + bookbill.amount})
            }
            return billAns;
        } catch(err) {
            console.log(err)
        }
        
    }
}
