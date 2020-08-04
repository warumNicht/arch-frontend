const TokenActions = {
    SET_TOKEN: 'SET_TOKEN',
    GET_TOKEN: 'GET_TOKEN'
}

const UserActions = {
    SET_CURRENT_USER: 'SET_CURRENT_USER',
    GET_CURRENT_USER: 'GET_CURRENT_USER'
}

const CategoryActions = {
    LOAD_CATEGORIES: 'LOAD_CATEGORIES'
}

export const ArticlesActions = {
    LOAD_ARTICLE: 'LOAD_ARTICLE',
    LOAD_LIST_OF_ARTICLES: 'LOAD_LIST_OF_ARTICLES',
    ADD_LANG: 'ADD_LANG',
    ADD_CONTENT: 'ADD_CONTENT',
    ADD_ADMIN_CONTENT: 'ADD_ADMIN_CONTENT',
    EDIT_ARTICLE_LANG: 'EDIT_ARTICLE_LANG'
}

export default TokenActions;
export { UserActions, CategoryActions };