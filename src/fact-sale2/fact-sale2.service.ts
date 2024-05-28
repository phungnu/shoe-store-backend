import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FactSale2 } from './fact-sale2.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FactSale2Service {
    constructor(
        @InjectRepository(FactSale2)
        private factSale2Repository: Repository<FactSale2>,
    ) {}

    async renewData(): Promise<void> {
        await this.factSale2Repository.query(`DELETE FROM thuctapcoso.fact_sale2;`);
        
        await this.factSale2Repository.query(`
            INSERT INTO thuctapcoso.fact_sale2 (month, shoe_id, address, total_sale)
            SELECT
                t.month,
                sb.shoe_id,
                u.address,
                SUM(sb.amount * s.price) AS total_sale
            FROM
                thuctapcoso.shoebills sb
            JOIN
                thuctapcoso.bills b ON sb.bill_id = b.id
            JOIN
                thuctapcoso.shoes s ON sb.shoe_id = s.id
            JOIN
                thuctapcoso.time t ON b.createAt = t.date
            JOIN
                thuctapcoso.users u ON b.user_id = u.id
            GROUP BY
                t.month, sb.shoe_id, u.address;
        `);
    }
}
