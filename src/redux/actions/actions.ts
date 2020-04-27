import TokenActions, {UserActions} from './ActionTypes';
import Action from '../interfaces/Action';

export default function setToken(token: string): Action {
    return { type: TokenActions.SET_TOKEN, payload: token }
}

export function getToken() {
    return { type: TokenActions.GET_TOKEN}
}

export function setCurrentUser(user: any): Action {
    return { type: UserActions.SET_CURRENT_USER, payload: user}
}

export function getCurrentUser() {
    return { type: UserActions.GET_CURRENT_USER}
}