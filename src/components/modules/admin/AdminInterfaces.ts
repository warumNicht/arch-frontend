export interface ErrorMessage {
    isTouched: boolean,
    messages: string[] | null
}

export interface ErrorMessages {
    [key: string]: ErrorMessage
}

export interface Conditions {
    allowEmpty: boolean,
    min: number,
    max?: number,
    beginUppercase?: boolean
}

interface ImageUrlModel {
    url: string
}

export interface ImageModel extends ImageUrlModel {
    name: string
}

export interface ValidatorsByField {
    [key: string]: {
        validationFunction: (value: any, conditions?: Conditions) => string[] | null,
        conditions?: Conditions
    }
}

export interface LanguageContent {
    title: string,
    content: string
}