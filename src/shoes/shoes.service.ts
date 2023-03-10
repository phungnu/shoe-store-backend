import { ShoesDb } from '../database';
import { Injectable } from '@nestjs/common';
import { IShoesRes } from './shoes.type';

@Injectable()
export class ShoesService{
    async findAll() : Promise<any>  {
        return await ShoesDb;
    }

    async findById(idShoes: number): Promise<IShoesRes> {
        const Shoes: IShoesRes = await ShoesDb.find(item => item.id==idShoes);
        return Shoes;
    }
}
