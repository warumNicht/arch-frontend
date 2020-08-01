import { LocalContent } from "./ArchitectureAppStore";

interface WithId{
    id:string
}

export interface ArticleEditLangRedux extends WithId{
    mainImage?: string,
    localContent: LocalContent
}

export interface ArticleAddLangRedux extends WithId{
    country: string,
    title: string,
    content: string,
    mainImageName?: string,
}