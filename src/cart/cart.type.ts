import { IShoesRes } from 'src/Shoes/Shoes.type';
import { IUserRes } from '../user/user.type';

export interface IResCart {
    user: IUserRes,
    listShoes: IShoesInCart[]
}

export interface IShoesInCart {
    Shoes: IShoesRes,
    amount: number
}