import { ApiProperty } from "@nestjs/swagger";

export class ICreateShoe {
    @ApiProperty()
    name: string

    @ApiProperty()
    price: number

    @ApiProperty()
    description: string

    @ApiProperty()
    imageUrl: string
}

export class IUpdateShoe {
    @ApiProperty()
    name?: string

    @ApiProperty()
    price?: number

    @ApiProperty()
    description?: string

    @ApiProperty()
    imageUrl?: string
}

export interface ShoeDTO {
    id: number,
    name: string,
    description: string,
    imageUrl: string,
    price: number
}