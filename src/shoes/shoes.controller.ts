import { ShoesService } from './shoes.service';
import { failResponse, successResponse } from '../utils/http';
import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@Controller('shoes')
@ApiTags('Shoes')
export class ShoesController {

    constructor(
        private ShoesService: ShoesService
    ){}

    @Get('/getAll')
    public async getAllShoes() {
        try {
            const listShoes = await this.ShoesService.findAll();
            if ( listShoes==null ) 
                return failResponse('Shoes was not found', 'ShoesNotFound');
            const res = {
                items: listShoes,
                total: listShoes.length
            }
            return successResponse(listShoes);
        } catch (error) {
            return failResponse('Execute service went wrong', 'ServiceException');
        }
    }

    @Get(':id')
    public async getShoesById(@Param('id') id: number) {
        try {
            const Shoes = await this.ShoesService.findById(id); 
            if ( Shoes==null ) 
                return failResponse('Shoes was not found', 'ShoesNotFound');
            return successResponse(Shoes);
        } catch( err ) {
            return failResponse('Execute service went wrong', 'ServiceException');
        }
    }
}
