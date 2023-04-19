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
        return await this.customerRepo.findOne({
            where: {id: id},
            relations: ['bills', 'bills.shoebills', 'shoebills.shoe']
        });
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
            relations: ['bills', 'bills.shoebills', 'shoebills.shoe']
        })
    }

    // cach khac de getAllcustomer co link den cac bang khac

    // const queryBuilder = this.entityManager.createQueryBuilder();
    // queryBuilder
    //     .select('customer.id', 'customerId')
    //     .addSelect('customer.name', 'customerName')
    //     .addSelect('bill.id', 'billId')
    //     .addSelect('bill.totalAmount', 'billTotalAmount')
    //     .addSelect('shoe.id', 'shoeId')
    //     .addSelect('shoe.name', 'shoeName')
    //     .addSelect('shoebill.quantity', 'shoeQuantity')
    //     .from('customer', 'customer')
    //     .leftJoin('customer.bills', 'bill')
    //     .leftJoin('bill.shoeBills', 'shoebill')
    //     .leftJoin('shoebill.shoe', 'shoe')
    //     .orderBy('customer.name', 'ASC')
    //     .addOrderBy('bill.totalAmount', 'DESC');

    // const result = await queryBuilder.getRawMany();
    // const customers = result.reduce((acc: Customer[], row: any) => {
    //     const customer = acc.find((c) => c.id === row.customerId);
    //     if (!customer) {
    //         acc.push({
    //         id: row.customerId,
    //         name: row.customerName,
    //         bills: [],
    //         });
    //     }

    //     const bill = customer?.bills.find((b) => b.id === row.billId);
    //     if (!bill) {
    //         customer?.bills.push({
    //         id: row.billId,
    //         totalAmount: row.billTotalAmount,
    //         shoeBills: [],
    //         });
    //     }

    //     const shoeBill = bill?.shoeBills.find((sb) => sb.shoe.id === row.shoeId);
    //     if (!shoeBill) {
    //         bill?.shoeBills.push({
    //         quantity: row.shoeQuantity,
    //         shoe: {
    //             id: row.shoeId,
    //             name: row.shoeName,
    //         },
    //         });
    //     } else {
    //         shoeBill.quantity += row.shoeQuantity;
    //     }

    //     return acc;
    //     }, []);

    //     return customers;
    // }
}