import TokenActions, { UserActions } from '../actions/ActionTypes'

const initialState = {
    token: '',
    user: {}
}

function todoApp(state: any, action: any) {
    if (typeof state === 'undefined') {
        return initialState
    }

    switch (action.type) {
        case TokenActions.SET_TOKEN:
            return Object.assign({}, state, {
                token: action.token
            })
        case UserActions.SET_CURRENT_USER:
            return Object.assign({}, state, {
                user: action.user
            })
        default:
            return state
    }

    export default todoApp;