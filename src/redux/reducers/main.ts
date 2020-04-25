import TokenActions, { UserActions } from '../actions/ActionTypes'

const initialState = {
    token: '',
    user: {}
}

function tokens(state: string, action: any) {

    if (typeof state === 'undefined') {
        return ''
    }

    switch (action.type) {
        case TokenActions.SET_TOKEN:
            return action.token

        default:
            return state
    }
}

function users(state: Object, action: any) {

    if (typeof state === 'undefined') {
        return {}
    }

    switch (action.type) {
        case UserActions.SET_CURRENT_USER:
            return action.user

        default:
            return state
    }
}


function main(state: any, action: any) {
    if (typeof state === 'undefined') {
        return initialState
    }

    return {
        token: tokens(state.token, action),
        user: users(state.user, action)
    }
}

export default main;