import { Controller, Get, Post, Param, Delete } from '@nestjs/common';
import { FactSale1Service } from './fact-sale1.service';

@Controller('fact-sale1')
export class FactSale1Controller {
  constructor(private readonly factSale1Service: FactSale1Service) {}

    @Post('renew-data')
    insertData(): Promise<void> {
        return this.factSale1Service.renewData();
    }

}
