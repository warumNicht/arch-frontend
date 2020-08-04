import { LocalContent } from "./ArchitectureAppStore";

interface WithId{
    id:string
}

export interface ArticleEditLangRedux extends WithId{
    mainImage?: string,
    localContent: LocalContent
}

export interface ArticleLangRedux extends WithId{
    country: string,
    title: string,
    content: string,
    mainImageName?: string,
    isCurrentLanguageEdited: boolean
}

export interface AddAdminContentRedux extends WithId{
    localContent: LocalContent
}

export interface ArticleContentRedux extends WithId{
    country: string,
    content:string,
    mainImageName?: string,
}