import { ApiProperty } from "@nestjs/swagger";
import { Shoe } from "src/shoe/shoe.entity";

export class ICreateShoeBill {
    @ApiProperty()
    quantity: number

    @ApiProperty()
    shoeId: number
}

export interface IShoeDTO {
    quantity: number,
    shoe: Shoe
}