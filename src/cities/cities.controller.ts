import { Controller, Get, Param } from '@nestjs/common';
import { CitiesService } from './cities.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('cities')
@ApiTags("cities")
export class CitiesController {
    constructor(
        private readonly citiesService: CitiesService
    ){}

    @Get()
    getCities(){
        return this.citiesService.getCities();
    }

    @Get('/:cityId/districts')
    getDistrictsByCityId(@Param('cityId') cityId) {
        return this.citiesService.getDistrictsByCityId(cityId);
    }

    @Get('/:cityId/districts/:districtId/communes')
    getCommunesByDistrictId(@Param('cityId') cityId, @Param('districtId') districtId) {
        return this.citiesService.getCommunesByDistrictId(cityId, districtId);
    }
}
