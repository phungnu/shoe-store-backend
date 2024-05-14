import { Controller, Post, Get, Put, Delete, Body, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ShoebillService } from './shoebill.service';
import { ICreateShoeBill } from './shoebill.type';
import { successResponse, failResponse } from 'src/utils/http';
import { IDInteface } from 'src/type';

@Controller('shoebill')
@ApiTags('ShoeBills')
export class ShoebillController {
    constructor(
        private readonly shoeBillService: ShoebillService
    ){}


    @Post('/create')
    async create(@Body() input: ICreateShoeBill): Promise<any> {
        try{    
            const checkExist = await this.shoeBillService.findByUserShoe(input.userId, input.shoeId);
            if ( checkExist.length>0 ) {
                for ( const shoebill of checkExist ) {
                    if(shoebill.bill==null) {
                        const res = await this.shoeBillService.updateAmount(shoebill.id, input);
                        return successResponse(res);
                    } 
                }
                
            }
            const shoebill = await this.shoeBillService.create(input);
            return successResponse(shoebill);
        }catch(error){
            return failResponse('Execute service went wrong', 'ServiceException');
        }
    }

    @Post('/user')
    async findByUser(@Body() input: IDInteface): Promise<any> {
        try{    
            const shoebills = await this.shoeBillService.findByUser(input.id);
            if (shoebills==null)
                return failResponse('Shoebill not found by user', 'NotFoundByUser');
            return successResponse(shoebills);
        }catch(error){
            return failResponse('Execute service went wrong', 'ServiceException');
        }
    }

    @Post('/user/cart')
    async findByUserinCart(@Body() input: IDInteface): Promise<any> {
        try{    
            const shoebills = await this.shoeBillService.findByUserinCart(input.id);
            if (shoebills==null)
                return failResponse('Shoebill not found by user', 'NotFoundByUser');
            return successResponse(shoebills);
        }catch(error){
            console.log(error)
            return failResponse('Execute service went wrong', 'ServiceException');
        }
    }

    @Post('/delete')
    async delete(@Body() input: IDInteface): Promise<any>{
        try{    
            const shoebill = await this.shoeBillService.findById(input.id);
            if (shoebill==null)
                return failResponse('Shoebill not found', 'NotFound');
            const res = await this.shoeBillService.delete(input.id);
            return successResponse(res);
        }catch(error){
            return failResponse('Execute service went wrong', 'ServiceException');
        }
    }

}
