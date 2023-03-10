import { phoneDb } from './../database';
import { Injectable } from '@nestjs/common';
import { IPhoneRes } from './phone.type';

@Injectable()
export class PhoneService{
    async findAll() : Promise<any>  {
        return await phoneDb;
    }

    async findById(idPhone: number): Promise<IPhoneRes> {
        const phone: IPhoneRes = await phoneDb.find(item => item.id==idPhone);
        return phone;
    }
}
