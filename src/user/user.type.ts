import { ApiProperty } from "@nestjs/swagger";

export class IRegister {

    @ApiProperty()
    username: string;

    @ApiProperty()
    password: string;

    @ApiProperty()
    confirmPassword: string
}

export interface IUserDTO {
    id: number,
    username: string,
    password: string
}

export class ILogin {
    @ApiProperty()
    username: string;

    @ApiProperty()
    password: string
}


export interface IUserResponse{
    id: number,
    username: string,
    accessToken?: string
}


export interface IUserRes {
    id: number,
    username: string
}

export interface IUserCreate {
    username: string,
    password: string,
    createAt: string
}