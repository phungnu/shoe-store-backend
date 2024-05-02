import { Injectable } from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs';

@Injectable()
export class CitiesService {
    private readonly citiesFilePath = path.resolve(__dirname, 'data/cities.json');

    getCities(){
        return this.readFile(this.citiesFilePath);
    }

    getDistrictsByCityId(cityId: string){
        const cities = this.readFile(this.citiesFilePath);
        const city = cities.find(city => city.id === cityId);
        return city ? city.districts : [];
    }

    getCommunesByDistrictId(cityId: string, districtId: string) {
        const cities = this.readFile(this.citiesFilePath);
        const city = cities.find(city => city.id === cityId);
        const district = city ? city.districts.find(district => district.id === districtId) : null;
        return district ? district.communes : [];
    }


    private readFile(filePath: string){
        const data = fs.readFileSync(filePath, 'utf-8');
        return JSON.parse(data);
    }

}
