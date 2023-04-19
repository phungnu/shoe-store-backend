import { ApiProperty } from "@nestjs/swagger";
import { ICreateCustomer } from "src/customer/customer.type";

export class ICreateBill {
    @ApiProperty()
    address: string

    @ApiProperty()
    message: string

    @ApiProperty()
    customerInfo: ICreateCustomer

    @ApiProperty()
    shoeBills: {shoeId: number, quantity: number}[]
}