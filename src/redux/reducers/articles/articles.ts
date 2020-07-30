import { ArticlesActions } from '../../actions/ActionTypes';
import { Article } from '../../interfaces/ArchitectureAppStore';

const initialArticlesState: Article[] = [];

function articles(state = initialArticlesState, action: any) {
    switch (action.type) {
        case ArticlesActions.LOAD_ARTICLE: {
            if(findArticleById(state, action.article.id)){
                return state;
            }
            return [
                ...state,
                action.article
            ]
        }
        case ArticlesActions.GET_ARTICLE_BY_ID:
            return action.payload
        default:
            return state
    }
}

function findArticleById(state: Article[], articleId: string): Article | undefined{
    const found = state.find(article => article.id === articleId)
    return found;
}

export default articles;