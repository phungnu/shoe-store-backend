import { IUserRes, IUserDTO } from '../user/user.type';
import { UserService } from '../user/user-service';
import { IShoesRes } from './../Shoes/Shoes.type';
import { ShoesService } from './../Shoes/Shoes.service';
import { IResCart, IShoesInCart } from './cart.type';
import { Injectable } from '@nestjs/common';
import { cartDb } from 'src/database';

@Injectable()
export class CartService {

    constructor(
        private ShoesService: ShoesService,
        private userService: UserService
    ){}


    async getCartByUser(userId: number) {
        const listShoesCart: IShoesInCart[] = [];
        for( let i = 0; i < cartDb.length; i++) {
            if ( cartDb[i].userId==userId ) {
                const Shoes: IShoesRes = await this.ShoesService.findById(cartDb[i].ShoesId);
                listShoesCart.push({
                    Shoes: Shoes,
                    amount: cartDb[i].amount
                })
            }
        }
        const user: IUserDTO = await this.userService.findById(userId);
        const userRes: IUserRes = {
            id: userId,
            username: user.username
        }
        const resCart: IResCart = {
            user: userRes,
            listShoes: listShoesCart
        }
        return resCart;
    }

}
