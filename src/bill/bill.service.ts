import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Bill } from './bill.entity';
import { Repository } from 'typeorm';
import { ICreateBill } from './bill.type';
import { Customer } from 'src/customer/customer.entity';
import { Shoe } from 'src/shoe/shoe.entity';
import { ShoeBill } from 'src/shoebill/shoebill.entity';

@Injectable()
export class BillService {
    constructor(
        @InjectRepository(Bill) private readonly billRepo: Repository<Bill>,
        @InjectRepository(Customer) private readonly customerRepo: Repository<Customer>,
        @InjectRepository(Shoe) private readonly shoeRepo: Repository<Shoe>,
        @InjectRepository(ShoeBill) private readonly shoeBillRepo: Repository<ShoeBill>,
    ){}

    async findAll(): Promise<Bill[]> {
        return await this.billRepo.find({
            relations: ['customer', 'shoebills', 'shoebills.shoe']
        });
    }

    async findById(id: number): Promise<Bill>{
        return await this.billRepo.findOne({where: {id: id}})
    }

    async findByCustomer(customerId: number): Promise<Bill[]>{
        return this.billRepo.find({
            where: {
                customer: {id: customerId}
            }
        })
    }

    async createBill(input: ICreateBill): Promise<any>{
        let customer = await this.customerRepo.findOne({where: {phone: input.customerInfo.phone}})
        if ( customer==null )
            await this.customerRepo.save(input.customerInfo);
        customer = await this.customerRepo.findOne({where: {phone: input.customerInfo.phone}});

        const bill = this.billRepo.create({
            address: input.address,
            message: input.message,
            customer
        });
        await this.billRepo.save(bill);

        for ( const shoebillReq of input.shoeBills ) {
            const shoe = await this.shoeRepo.findOne({where: {id: shoebillReq.shoeId}});
            const shoebill = this.shoeBillRepo.create({
                quantity: shoebillReq.quantity,
                bill,
                shoe
            })
            await this.shoeBillRepo.save(shoebill)
        }

        return bill;
    }
}
