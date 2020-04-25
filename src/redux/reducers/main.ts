import TokenActions, { UserActions } from '../actions/ActionTypes'

const initialState = {
    token: '',
    user: {}
}

function tokens(state = '', action: any) {
    switch (action.type) {
        case TokenActions.SET_TOKEN:
            return action.token

        default:
            return state
    }
}

function users(state = {}, action: any) {
    switch (action.type) {
        case UserActions.SET_CURRENT_USER:
            return action.user

        default:
            return state
    }
}

function main(state = initialState, action: any) {
    return {
        token: tokens(state.token, action),
        user: users(state.user, action)
    }
}

export default main;