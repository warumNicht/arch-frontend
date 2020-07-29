import { combineReducers } from 'redux'
import token from './tokens'
import user from './users'
import categories from './categories';
import articlesByCategories from './articles/articlesIndex';

const mainReducer = combineReducers({
    token,
    user,
    categories,
    articlesByCategories
})

export default mainReducer;