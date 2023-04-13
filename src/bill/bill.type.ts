import { ApiProperty } from "@nestjs/swagger";
import { ICreateCustomer } from "src/customer/customer.type";

export class ICreateBill {
    @ApiProperty()
    address: string

    @ApiProperty()
    message: string

    @ApiProperty()
    customer: ICreateCustomer

    @ApiProperty()
    shoeIds: number[]
}