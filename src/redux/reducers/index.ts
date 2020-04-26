import { combineReducers } from 'redux'
import token from './tokens'
import user from './users'

const initialState = {
    token: '',
    user: {}
}

const mainReducer = combineReducers({
    token,
    user
})

export default mainReducer;