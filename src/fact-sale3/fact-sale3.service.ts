import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FactSale3 } from './fact-sale3.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FactSale3Service {
    constructor(
        @InjectRepository(FactSale3)
        private factSale2Repository: Repository<FactSale3>,
    ) {}

    async renewData(): Promise<void> {
        await this.factSale2Repository.query(`DELETE FROM thuctapcoso.fact_sale3;`);
        
        await this.factSale2Repository.query(`
            INSERT INTO thuctapcoso.fact_sale3 (id, month, Sales_growth)
            SELECT
                1 AS id,
                1 AS month,
                0 AS Sales_growth
            UNION
            SELECT
                2 AS id,
                2 AS month,
                ((fs2_this_month.total_sale - fs2_prev_month.total_sale) / fs2_prev_month.total_sale) * 100 AS Sales_growth
            FROM (
                SELECT SUM(total_sale) AS total_sale
                FROM thuctapcoso.fact_sale2
                WHERE month = 1
            ) AS fs2_prev_month
            JOIN (
                SELECT SUM(total_sale) AS total_sale
                FROM thuctapcoso.fact_sale2
                WHERE month = 2
            ) AS fs2_this_month
            UNION
            SELECT
                3 AS id,
                3 AS month,
                ((fs2_this_month.total_sale - fs2_prev_month.total_sale) / fs2_prev_month.total_sale) * 100 AS Sales_growth
            FROM (
                SELECT SUM(total_sale) AS total_sale
                FROM thuctapcoso.fact_sale2
                WHERE month = 2
            ) AS fs2_prev_month
            JOIN (
                SELECT SUM(total_sale) AS total_sale
                FROM thuctapcoso.fact_sale2
                WHERE month = 3
            ) AS fs2_this_month
            UNION
            -- Thêm các SELECT UNION tương tự cho các tháng còn lại từ 4-12
            SELECT
                4 AS id,
                4 AS month,
                ((fs2_this_month.total_sale - fs2_prev_month.total_sale) / fs2_prev_month.total_sale) * 100 AS Sales_growth
            FROM (
                SELECT SUM(total_sale) AS total_sale
                FROM thuctapcoso.fact_sale2
                WHERE month = 3
            ) AS fs2_prev_month
            JOIN (
                SELECT SUM(total_sale) AS total_sale
                FROM thuctapcoso.fact_sale2
                WHERE month = 4
            ) AS fs2_this_month
            UNION
            SELECT
                5 AS id,
                5 AS month,
                ((fs2_this_month.total_sale - fs2_prev_month.total_sale) / fs2_prev_month.total_sale) * 100 AS Sales_growth
            FROM (
                SELECT SUM(total_sale) AS total_sale
                FROM thuctapcoso.fact_sale2
                WHERE month = 4
            ) AS fs2_prev_month
            JOIN (
                SELECT SUM(total_sale) AS total_sale
                FROM thuctapcoso.fact_sale2
                WHERE month = 5
            ) AS fs2_this_month
            UNION
            SELECT
                6 AS id,
                6 AS month,
                ((fs2_this_month.total_sale - fs2_prev_month.total_sale) / fs2_prev_month.total_sale) * 100 AS Sales_growth
            FROM (
                SELECT SUM(total_sale) AS total_sale
                FROM thuctapcoso.fact_sale2
                WHERE month = 5
            ) AS fs2_prev_month
            JOIN (
                SELECT SUM(total_sale) AS total_sale
                FROM thuctapcoso.fact_sale2
                WHERE month = 6
            ) AS fs2_this_month
            UNION
            SELECT
                7 AS id,
                7 AS month,
                ((fs2_this_month.total_sale - fs2_prev_month.total_sale) / fs2_prev_month.total_sale) * 100 AS Sales_growth
            FROM (
                SELECT SUM(total_sale) AS total_sale
                FROM thuctapcoso.fact_sale2
                WHERE month = 6
            ) AS fs2_prev_month
            JOIN (
                SELECT SUM(total_sale) AS total_sale
                FROM thuctapcoso.fact_sale2
                WHERE month = 7
            ) AS fs2_this_month
            UNION
            SELECT
                8 AS id,
                8 AS month,
                ((fs2_this_month.total_sale - fs2_prev_month.total_sale) / fs2_prev_month.total_sale) * 100 AS Sales_growth
            FROM (
                SELECT SUM(total_sale) AS total_sale
                FROM thuctapcoso.fact_sale2
                WHERE month = 7
            ) AS fs2_prev_month
            JOIN (
                SELECT SUM(total_sale) AS total_sale
                FROM thuctapcoso.fact_sale2
                WHERE month = 8
            ) AS fs2_this_month
            UNION
            SELECT
                9 AS id,
                9 AS month,
                ((fs2_this_month.total_sale - fs2_prev_month.total_sale) / fs2_prev_month.total_sale) * 100 AS Sales_growth
            FROM (
                SELECT SUM(total_sale) AS total_sale
                FROM thuctapcoso.fact_sale2
                WHERE month = 8
            ) AS fs2_prev_month
            JOIN (
                SELECT SUM(total_sale) AS total_sale
                FROM thuctapcoso.fact_sale2
                WHERE month = 9
            ) AS fs2_this_month
            UNION
            SELECT
                10 AS id,
                10 AS month,
                ((fs2_this_month.total_sale - fs2_prev_month.total_sale) / fs2_prev_month.total_sale) * 100 AS Sales_growth
            FROM (
                SELECT SUM(total_sale) AS total_sale
                FROM thuctapcoso.fact_sale2
                WHERE month = 9
            ) AS fs2_prev_month
            JOIN (
                SELECT SUM(total_sale) AS total_sale
                FROM thuctapcoso.fact_sale2
                WHERE month = 10
            ) AS fs2_this_month
            UNION
            SELECT
                11 AS id,
                11 AS month,
                ((fs2_this_month.total_sale - fs2_prev_month.total_sale) / fs2_prev_month.total_sale) * 100 AS Sales_growth
            FROM (
                SELECT SUM(total_sale) AS total_sale
                FROM thuctapcoso.fact_sale2
                WHERE month = 10
            ) AS fs2_prev_month
            JOIN (
                SELECT SUM(total_sale) AS total_sale
                FROM thuctapcoso.fact_sale2
                WHERE month = 11
            ) AS fs2_this_month
            UNION
            SELECT
                12 AS id,
                12 AS month,
                ((fs2_this_month.total_sale - fs2_prev_month.total_sale) / fs2_prev_month.total_sale) * 100 AS Sales_growth
            FROM (
                SELECT SUM(total_sale) AS total_sale
                FROM thuctapcoso.fact_sale2
                WHERE month = 11
            ) AS fs2_prev_month
            JOIN (
                SELECT SUM(total_sale) AS total_sale
                FROM thuctapcoso.fact_sale2
                WHERE month = 12
            ) AS fs2_this_month;
        `);
    }
}
