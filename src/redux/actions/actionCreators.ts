import TokenActions, {UserActions, CategoryActions, ArticlesActions} from './ActionTypes';
import Action, { SetUserAction, AddArticleAction } from '../interfaces/Action';
import {User, Category, Article} from '../interfaces/ArchitectureAppStore';

export default function setToken(token: string): Action {
    return { type: TokenActions.SET_TOKEN, payload: token }
}

export function getToken() {
    return { type: TokenActions.GET_TOKEN}
}

export function setCurrentUser(user: User | null): SetUserAction  {
    return { type: UserActions.SET_CURRENT_USER, user: user }
}

export function getCurrentUser() {
    return { type: UserActions.GET_CURRENT_USER}
}

export function storeCategoriesInRedux(categories: Category[]): Action {
    return { type: CategoryActions.LOAD_CATEGORIES, payload: categories }
}

//articles
export function loadArticle(article: Article): AddArticleAction  {
    return { type: ArticlesActions.LOAD_ARTICLE, article: article }
}

export function getArticleById(articleId: string): Action  {
    return { type: ArticlesActions.GET_ARTICLE_BY_ID, payload: articleId }
}
