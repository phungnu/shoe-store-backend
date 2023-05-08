import { ApiProperty } from "@nestjs/swagger";

export class ICreateCustomer {
    @ApiProperty()
    fullName: string

    @ApiProperty()
    phone: string

    @ApiProperty()
    email: string
}

export class IPhone {
    @ApiProperty()
    phone: string
}