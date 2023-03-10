export interface IBaseResponse {
    statusCode: string
}

export interface SuccessResponseType<D> extends IBaseResponse {
    data: D
}

export interface FailResponseType<E> extends IBaseResponse {
    message: E
}

export const successResponse = <D>(data: D): SuccessResponseType<D> => {
    return {data, statusCode: 'OK'}
}

export const failResponse = <E>(message: E, statusCode: string): FailResponseType<E> => {
    return {message, statusCode}
}