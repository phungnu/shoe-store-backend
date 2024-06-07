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

    async getStatistics(month: number, year: number): Promise<any> {
        const previousMonth = month === 1 ? 12 : month - 1;
        const previousMonthYear = month === 1 ? year - 1 : year;
    
        const [currentMonthBills, previousMonthBills, allBills] = await Promise.all([
            this.billRepo.createQueryBuilder('bill')
                .where('MONTH(bill.createAt) = :month AND YEAR(bill.createAt) = :year', { month, year })
                .getMany(),
            this.billRepo.createQueryBuilder('bill')
                .where('MONTH(bill.createAt) = :previousMonth AND YEAR(bill.createAt) = :previousMonthYear', { previousMonth, previousMonthYear })
                .getMany(),
            this.billRepo.find(),
        ]);
    
        const totalRevenue = allBills.reduce((sum, bill) => {
            return sum + bill.shoebills.reduce((billSum, shoebill) => {
                return billSum + shoebill.amount * shoebill.shoe.price;
            }, 0);
        }, 0);
    
        const profit = allBills.reduce((sum, bill) => {
            return sum + bill.shoebills.reduce((billSum, shoebill) => {
                return billSum + shoebill.amount * (shoebill.shoe.price - shoebill.shoe.cost);
            }, 0);
        }, 0);
    
        const totalOrders = allBills.length;
        const successfulOrders = allBills.filter(bill => bill.status === 1).length; // Giả định status = 1 là đơn hàng thành công
        const successRate = (successfulOrders / totalOrders) * 100;
    
        const previousMonthRevenue = previousMonthBills.reduce((sum, bill) => {
            return sum + bill.shoebills.reduce((billSum, shoebill) => {
                return billSum + shoebill.amount * shoebill.shoe.price;
            }, 0);
        }, 0);
    
        const currentMonthRevenue = currentMonthBills.reduce((sum, bill) => {
            return sum + bill.shoebills.reduce((billSum, shoebill) => {
                return billSum + shoebill.amount * shoebill.shoe.price;
            }, 0);
        }, 0);
    
        const bestMonth = await this.billRepo.createQueryBuilder('bill')
          .select('MONTH(bill.createAt)', 'month')
          .addSelect('SUM(shoebill.amount * shoe.price)', 'revenue')
          .leftJoin('bill.shoebills', 'shoebill')
          .leftJoin('shoebill.shoe', 'shoe')
          .groupBy('MONTH(bill.createAt)')
          .orderBy('revenue', 'DESC')
          .limit(1)
          .getRawOne();
    
        const growthRate = ((currentMonthRevenue - previousMonthRevenue) / previousMonthRevenue) * 100;
    
        const topProducts = await this.shoeBillRepo.createQueryBuilder('shoebill')
          .select('shoe.name', 'name')
          .addSelect('SUM(shoebill.amount)', 'amount')
          .leftJoin('shoebill.shoe', 'shoe')
          .groupBy('shoe.name')
          .orderBy('amount', 'DESC')
          .limit(3)
          .getRawMany();
    
        return {
            totalRevenue,
            profit,
            totalOrders,
            successRate,
            previousMonthRevenue,
            currentMonthRevenue,
            bestMonth,
            growthRate,
            topProducts,
        };
      }
}
