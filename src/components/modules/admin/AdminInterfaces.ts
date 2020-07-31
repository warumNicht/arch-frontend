import { LangEnum } from "../../../constants/appConstants";

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

export interface ImageUrlModel {
    url: string
}

export interface ImageModel extends ImageUrlModel {
    name: string
}

export interface ArticleCountry {
    country: LangEnum,
}

export interface ArticleTitleContent {
    title: string,
    content: string
}

export interface ArticleBaseModel extends ArticleCountry, ArticleTitleContent {
}

export interface ValidatorsByField {
    [key: string]: {
        validationFunction: (value: any, conditions?: Conditions) => string[] | null,
        conditions?: Conditions
    }
}

export interface LanguageTitle {
    title: string,
    content?: string
}

export interface LocalContent {
    [key: string]: LanguageTitle
}