import { ApiProperty } from "@nestjs/swagger";

export class ICreateBill {
    @ApiProperty()
    address: string

    @ApiProperty()
    message: string

    @ApiProperty()
    userId: number

    @ApiProperty()
    shoeBills: number[]
}