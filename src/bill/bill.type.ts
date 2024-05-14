import { ApiProperty } from "@nestjs/swagger";

export class ICreateBill {
    @ApiProperty()
    address: string

    @ApiProperty()
    message: string

    @ApiProperty()
    userId: number

    @ApiProperty()
    shoeBills: ShoeBillCreate[]
}

class ShoeBillCreate {
    @ApiProperty()
    amount: number

    @ApiProperty()
    size: number

    @ApiProperty()
    shoeId: number
}
