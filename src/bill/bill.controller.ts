import { Controller, Param, Get, Post, Body, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { BillService } from './bill.service';
import { failResponse, successResponse } from 'src/utils/http';
import { ICreateBill } from './bill.type';
import { IDInteface, StatusInterface } from 'src/type';

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

    @Post('/user')
    async findByUser(@Body() input: IDInteface): Promise<any>{
        try{    
            const listBill = await this.billService.findByUser(input.id);
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

    @Post('/updateStatus')
    async changeAmount(@Body() input: StatusInterface): Promise<any>{
        try{    
            const bill = await this.billService.findById(input.id);
            if (bill==null)
                return failResponse('Shoebill not found', 'NotFound');
            const res = await this.billService.updateStatus(input.id, input.status);
            return successResponse(res);
        }catch(error){
            return failResponse('Execute service went wrong', 'ServiceException');
        }
    }

    @Get('/statistics')
    async getStatistics(@Query('month') month: number, @Query('year') year: number): Promise<any> {
        try {
            const stats = await this.billService.getStatistics(month, year);
            return successResponse(stats);
        } catch (error) {
            return failResponse('Execute service went wrong', 'ServiceException');
        }
    }
}
