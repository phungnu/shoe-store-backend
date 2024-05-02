import { Injectable } from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs';

@Injectable()
export class CitiesService {
    private readonly citiesFilePath = path.resolve(__dirname, '../src/cities/data/city.json');

    private readonly districtFilePath = path.resolve(__dirname, '../src/cities/data/district.json');

    private readonly wardFilePath = path.resolve(__dirname, '../src/cities/data/ward.json');

    getCities(){
        return this.readFile(this.citiesFilePath);
    }

    getDistrictsByCityId(cityId: string){
        const allData = this.readFile(this.districtFilePath);
        var data = [];
        for ( var i = 0; i < allData.length; i++){
            if ( allData[i]['parent_code'] == cityId ){
                data.push(allData[i]);
            }
        }
        return data;
    }

    getCommunesByDistrictId(districtId: string) {
        const allData = this.readFile(this.wardFilePath);
        var data = [];
        for ( var i = 0; i < allData.length; i++){
            if ( allData[i]['parent_code'] == districtId ){
                data.push(allData[i]);
            }
        }
        return data;
    }


    private readFile(filePath: string){
        const data = fs.readFileSync(filePath, 'utf-8');
        return JSON.parse(data);
    }

}
