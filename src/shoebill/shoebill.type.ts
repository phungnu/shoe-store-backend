import { ApiProperty } from "@nestjs/swagger";
import { Shoe } from "src/shoe/shoe.entity";
import { User } from "src/user/user.entity";

export class ICreateShoeBill {
    @ApiProperty()
    amount: number

    @ApiProperty()
    shoeId: number

    @ApiProperty()
    size: number

    @ApiProperty()
    userId: number
}

export interface IShoeDTO {
    amount: number,
    size: number,
    shoe: Shoe,
    user: User
}