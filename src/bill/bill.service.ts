import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Bill } from './bill.entity';
import { Repository } from 'typeorm';
import { ICreateBill } from './bill.type';
import { ShoebillService } from 'src/shoebill/shoebill.service';

@Injectable()
export class BillService {
    constructor(
        @InjectRepository(Bill) private readonly billRepo: Repository<Bill>,
        private readonly shoeBillService: ShoebillService
    ){}

    async findAll(): Promise<Bill[]> {
        return await this.billRepo.find();
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
        
    }
}
