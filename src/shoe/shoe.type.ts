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

    @ApiProperty()
    userId: number

    @ApiProperty()
    quantity: number
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

    @ApiProperty()
    quantity?: number
}

export interface ShoeDTO {
    id: number,
    name: string,
    description: string,
    imageUrl: string,
    price: number,
    quantity: number
}