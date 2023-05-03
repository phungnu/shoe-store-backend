import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CustomerService } from './customer.service';
import { failResponse, successResponse } from 'src/utils/http';
import { ICreateCustomer } from './customer.type';

@Controller('customer')
@ApiTags('Customer')
export class CustomerController {
    constructor(
        private readonly customerService: CustomerService
    ){}


    @Post('')
    async createCustomer(@Body() input: ICreateCustomer): Promise<any> {
        try {
            const customer = await this.customerService.create(input);
            return successResponse(customer);
        }catch(error) {
            return failResponse('Execute service went wrong', 'ServiceException');
        }
    }

    @Get('/getAll')
    async getAllCustomer(): Promise<any> {
        try{
            const listCustomer = await this.customerService.findAll();
            if ( listCustomer==null )
                return failResponse('Customer not found', 'CustomerNotFound');
            return successResponse(listCustomer);
        } catch(error) {
            return failResponse('Execute service went wrong', 'ServiceException');
        }
    }

    @Get('/{id}')
    async getById(@Param('id') customerId: number): Promise<any>{
        try{
            const customer = await this.customerService.findById(customerId);
            if ( customer==null )
                return failResponse('Customer not found', 'CustomerNotFound');
            return successResponse(customer);
        } catch(error) {
            return failResponse('Execute service went wrong', 'ServiceException');
        }
    }
}
