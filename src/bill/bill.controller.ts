import { Controller, Param, Get, Post, Body } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { BillService } from './bill.service';
import { failResponse, successResponse } from 'src/utils/http';
import { ICreateBill } from './bill.type';

@Controller('bill')
@ApiTags('Bills')
export class BillController {
    constructor(
        private readonly billService: BillService
    ){}


    @Post()
    async create(@Body() input: ICreateBill): Promise<any> {
        try{    
            const bill = await this.billService.createBill(input);
            return successResponse(bill);
        }catch(error){
            return failResponse('Execute service went wrong', 'ServiceException');
        }
    }

    @Get('/customer/{id}')
    async findByCustomer(@Param('id') customerId: number): Promise<any>{
        try{    
            const listBill = await this.billService.findByCustomer(customerId);
            if (listBill==null) 
                return failResponse('Bill is not found', 'BillNotFound');
            return successResponse(listBill);
        }catch(error){
            return failResponse('Execute service went wrong', 'ServiceException');
        }
    }

    @Get('/getAll')
    async findAll(): Promise<any> {
        try{    
            const listBill = await this.billService.findAll();
            if (listBill==null)
                return failResponse('Bill is not found', 'BillNotFound');
            return successResponse(listBill);
        }catch(error){
            return failResponse('Execute service went wrong', 'ServiceException');
        }
    }
}
