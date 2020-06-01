import { combineReducers } from 'redux'
import token from './tokens'
import user from './users'
import categories from './categories';

const mainReducer = combineReducers({
    token,
    user,
    categories
})

export default mainReducer;