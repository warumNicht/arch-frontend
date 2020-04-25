import TokenActions, { UserActions } from '../actions/ActionTypes'
import { combineReducers } from 'redux'

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

const main = combineReducers({
    tokens,
    users
})

export default main;