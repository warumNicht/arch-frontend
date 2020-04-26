import TokenActions, {UserActions} from './ActionTypes';

export default function setToken(token: string) {
    return { type: TokenActions.SET_TOKEN, token }
}

export function getToken() {
    return { type: TokenActions.GET_TOKEN}
}

export function setCurrentUser(user: any) {
    return { type: UserActions.SET_CURRENT_USER, user}
}

export function getCurrentUser() {
    return { type: UserActions.GET_CURRENT_USER}
}