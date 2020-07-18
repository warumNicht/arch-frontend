import TokenActions, {UserActions, CategoryActions} from './ActionTypes';
import Action, { SetUserAction } from '../interfaces/Action';
import {User, Category} from '../interfaces/ArchitectureAppStore';

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