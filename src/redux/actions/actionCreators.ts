import TokenActions, { UserActions, CategoryActions, ArticlesActions } from './ActionTypes';
import Action, { SetUserAction, AddArticleAction, ActionT } from '../interfaces/Action';
import { User, Category, Article } from '../interfaces/ArchitectureAppStore';
import { ArticleEditLangRedux, ArticleAddLangRedux } from '../interfaces/DispatchInterfaces';

export default function setToken(token: string): Action {
    return { type: TokenActions.SET_TOKEN, payload: token }
}

export function getToken() {
    return { type: TokenActions.GET_TOKEN }
}

export function setCurrentUser(user: User | null): SetUserAction {
    return { type: UserActions.SET_CURRENT_USER, user: user }
}

export function getCurrentUser() { //to del
    return { type: UserActions.GET_CURRENT_USER }
}

export function storeCategoriesInRedux(categories: Category[]): Action {
    return { type: CategoryActions.LOAD_CATEGORIES, payload: categories }
}

//articles
export function loadArticle(article: Article): ActionT<Article> {
    return { type: ArticlesActions.LOAD_ARTICLE, payload: article }
}

export function editArticleLang(article: ArticleEditLangRedux): ActionT<ArticleEditLangRedux> {
    return { type: ArticlesActions.EDIT_ARTICLE_LANG, payload: article }
}

export function articleAddLang(article: ArticleAddLangRedux): ActionT<ArticleAddLangRedux> {
    return { type: ArticlesActions.ADD_LANG, payload: article }
}
