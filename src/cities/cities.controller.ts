import { Controller, Get } from '@nestjs/common';
import { CitiesService } from './cities.service';

@Controller('cities')
export class CitiesController {
    constructor(
        private readonly citiesService: CitiesService
    ){}

    @Get()
    getCities(){
        return this.citiesService.getCities();
    }

    @Get(':cityId/districts')
    getDistrictsByCityId(cityId: string) {
        return this.citiesService.getDistrictsByCityId(cityId);
    }

    @Get(':cityId/districts/:districtId/communes')
    getCommunesByDistrictId(cityId: string, districtId: string) {
        return this.citiesService.getCommunesByDistrictId(cityId, districtId);
    }
}
