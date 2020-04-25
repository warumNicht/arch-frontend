import { combineReducers } from 'redux'
import tokens from './tokens'
import users from './users'

const initialState = {
    token: '',
    user: {}
}

const mainReducer = combineReducers({
    tokens,
    users
})

export default mainReducer;