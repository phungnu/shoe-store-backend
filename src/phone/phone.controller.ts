import { PhoneService } from './phone.service';
import { failResponse, successResponse } from './../utils/http';
import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@Controller('phone')
@ApiTags('Phone')
export class PhoneController {

    constructor(
        private phoneService: PhoneService
    ){}

    @Get('/getAll')
    public async getAllPhone() {
        try {
            const listPhone = await this.phoneService.findAll();
            if ( listPhone==null ) 
                return failResponse('Phone was not found', 'PhoneNotFound');
            const res = {
                items: listPhone,
                total: listPhone.length
            }
            return successResponse(listPhone);
        } catch (error) {
            return failResponse('Execute service went wrong', 'ServiceException');
        }
    }

    @Get(':id')
    public async getPhoneById(@Param('id') id: number) {
        try {
            const phone = await this.phoneService.findById(id); 
            if ( phone==null ) 
                return failResponse('Phone was not found', 'PhoneNotFound');
            return successResponse(phone);
        } catch( err ) {
            return failResponse('Execute service went wrong', 'ServiceException');
        }
    }
}
