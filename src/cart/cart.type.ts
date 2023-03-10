import { IShoesRes } from 'src/shoes/shoes.type';
import { IUserRes } from '../user/user.type';

export interface IResCart {
    user: IUserRes,
    listShoes: IShoesInCart[]
}

export interface IShoesInCart {
    Shoes: IShoesRes,
    amount: number
}