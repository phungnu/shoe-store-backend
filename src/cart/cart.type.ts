import { IPhoneRes } from 'src/phone/phone.type';
import { IUserRes } from './../user-module/user.type';

export interface IResCart {
    user: IUserRes,
    listPhone: IPhoneInCart[]
}

export interface IPhoneInCart {
    phone: IPhoneRes,
    amount: number
}