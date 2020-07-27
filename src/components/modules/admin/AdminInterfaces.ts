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

interface ImageUrlModel {
    url: string
}

export interface ImageModel extends ImageUrlModel {
    name: string
}

export interface LocalContent {
    title: string,
    content: string
}