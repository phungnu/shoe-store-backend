import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FactSale1 } from './fact-sale1.entity';

@Injectable()
export class FactSale1Service {
    constructor(
        @InjectRepository(FactSale1)
        private factSale1Repository: Repository<FactSale1>,
    ) {}

    async renewData(): Promise<void> {
        await this.factSale1Repository.query(`DELETE FROM thuctapcoso.fact_sale1;`);
        
        await this.factSale1Repository.query(`
            INSERT INTO thuctapcoso.fact_sale1 (Visitor_to_Lead_Conversion_Rate, Order_success_rate, profit)
            SELECT 
                (COUNT(DISTINCT sb.user_id) / COUNT(u.id)) * 100 AS Visitor_to_Lead_Conversion_Rate,
                (SUM(CASE WHEN b.status = 1 THEN 1 ELSE 0 END) / COUNT(b.id)) * 100 AS Order_success_rate,
                SUM((s.price * sb.amount) - (s.cost * sb.amount)) AS profit
            FROM 
                thuctapcoso.shoebills sb
            JOIN 
                thuctapcoso.users u ON sb.user_id = u.id
            JOIN 
                thuctapcoso.shoes s ON sb.shoe_id = s.id
            JOIN 
                thuctapcoso.bills b ON sb.bill_id = b.id;
        `);
    }

}
