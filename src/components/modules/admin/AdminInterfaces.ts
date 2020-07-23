export interface ErrorMessage {
    isTouched: boolean,
    messages: string[] | null
}

export interface ErrorMessages {
    [key: string]: ErrorMessage
}

export interface ValidatorsByField {
    [key: string]: (value: any) => string[] | null
}