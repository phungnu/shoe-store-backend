import { IUserRes, IUserDTO } from './../user-module/user.type';
import { UserService } from './../user-module/user-service';
import { IPhoneRes } from './../phone/phone.type';
import { PhoneService } from './../phone/phone.service';
import { IResCart, IPhoneInCart } from './cart.type';
import { Injectable } from '@nestjs/common';
import { cartDb } from 'src/database';

@Injectable()
export class CartService {

    constructor(
        private phoneService: PhoneService,
        private userService: UserService
    ){}


    async getCartByUser(userId: number) {
        const listPhoneCart: IPhoneInCart[] = [];
        for( let i = 0; i < cartDb.length; i++) {
            if ( cartDb[i].userId==userId ) {
                const phone: IPhoneRes = await this.phoneService.findById(cartDb[i].phoneId);
                listPhoneCart.push({
                    phone: phone,
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
            listPhone: listPhoneCart
        }
        return resCart;
    }

}
