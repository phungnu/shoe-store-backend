import { CartService } from './cart.service';
import { failResponse, successResponse } from './../utils/http';
import { Controller, Get, Param } from '@nestjs/common';
import { ApiParam, ApiTags } from '@nestjs/swagger';

@Controller('cart')
@ApiTags('Cart')
export class CartController {

    constructor(
        private readonly cartService: CartService
    ){}

    @Get(':userId')
    public async getCartByUser(@Param('userId') userId: number ) {
        try{
            const res = await this.cartService.getCartByUser(userId);
            if ( res==null ) 
                return failResponse('Cart was not found', 'CartNotFound')
            return successResponse(res);
        } catch(err) {
            return failResponse('Execute service went wrong', 'ServiceException');
        }
    }
}
