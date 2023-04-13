import { Controller, Param, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { BillService } from './bill.service';
import { failResponse, successResponse } from 'src/utils/http';

@Controller('bill')
@ApiTags('Bills')
export class BillController {
    constructor(
        private readonly billService: BillService
    ){}

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
