import { Controller, Post } from '@nestjs/common';
import { FactSale3Service } from './fact-sale3.service';

@Controller('fact-sale3')
export class FactSale3Controller {
    constructor(private readonly factSale3Service: FactSale3Service) {}

    @Post('renew-data')
    insertData(): Promise<void> {
        return this.factSale3Service.renewData();
    }
}
