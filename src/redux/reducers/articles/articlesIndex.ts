import { combineReducers } from 'redux';
import articles from './articles';
import selectedCategories from './selectedCategories';

const articlesReducer = combineReducers({
    selectedCategories,
    articles
})

export default articlesReducer;