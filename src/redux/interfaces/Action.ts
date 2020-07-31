import { User, Article } from "./ArchitectureAppStore";
import { ArticleEditLangRedux } from "./DispatchInterfaces";

interface ActionType{
    type: string
}

export default interface Action extends ActionType{
    payload?: any
}

export interface ActionT<T> extends ActionType{
    payload: T
}

export interface SetUserAction extends ActionType{
    user: User | null
}

export interface AddArticleAction extends ActionType{
    article: Article
}

export interface EditArticleLangAction extends ActionType{
    article: ArticleEditLangRedux
}

