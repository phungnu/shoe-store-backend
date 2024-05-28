import { Controller, Get, Post, Param, Delete } from '@nestjs/common';
import { FactSale2Service } from './fact-sale2.service';

@Controller('fact-sale2')
export class FactSale2Controller {
    constructor(private readonly factSale2Service: FactSale2Service) {}

    @Post('renew-data')
    insertData(): Promise<void> {
        return this.factSale2Service.renewData();
    }

}
