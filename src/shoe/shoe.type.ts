import { ApiProperty } from "@nestjs/swagger";
import { User } from "src/user/user.entity";

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
    id: number

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

export interface ShoeDTOCreate {
    name: string,
    description: string,
    imageUrl: string,
    price: number,
    quantity: number,
    user: User
}

export class ShoeID {
    @ApiProperty()
    id: number
}