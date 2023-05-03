import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Customer } from './customer.entity';
import { Repository } from 'typeorm';
import { ICreateCustomer } from './customer.type';
import { Bill } from 'src/bill/bill.entity';

@Injectable()
export class CustomerService {
    constructor(
        @InjectRepository(Customer) private readonly customerRepo: Repository<Customer>,
        @InjectRepository(Bill) private readonly billRepo: Repository<Bill>
    ){}

    async create(input: ICreateCustomer): Promise<Customer>{
        return await this.customerRepo.save(input);
    }

    async findById(id: number): Promise<Customer>{
        return await this.customerRepo.find({
            where: {id: id},
            relations: ['bills', 'bills.shoebills', 'bills.shoebills.shoe']
        })[0];
    }

    async findByPhone(phone: string): Promise<Customer>{
        return await this.customerRepo.findOne({where: {phone: phone}})
    }

    async findByBill(billId: number): Promise<Customer>{
        const bill = await this.billRepo
            .createQueryBuilder('bill')
            .innerJoinAndSelect('bill.customer', 'customer')
            .where('bill.id = :billId', {billId})
            .getOne();
        return bill?.customer;
    }

    async findAll(): Promise<Customer[]> {
        return await this.customerRepo.find({
            relations: ['bills', 'bills.shoebills', 'bills.shoebills.shoe']
        })
    }

}