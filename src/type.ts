
import { ApiProperty } from "@nestjs/swagger";

export class IDInteface {
    @ApiProperty()
    id: number
}

export class AmountInteface {
    @ApiProperty()
    id: number

    @ApiProperty()
    action: string
}

export class StatusInterface {
    @ApiProperty()
    id: number

    @ApiProperty()
    status: number
}


export interface IResponseSuccess {
    data: DocumentType,
    total: number
}