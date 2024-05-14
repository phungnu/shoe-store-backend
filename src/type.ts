
import { ApiProperty } from "@nestjs/swagger";

export class IDInteface {
    @ApiProperty()
    id: number
}

export interface IResponseSuccess {
    data: DocumentType,
    total: number
}