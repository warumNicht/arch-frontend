import { ArticlesActions } from '../../actions/ActionTypes';
import { Article } from '../../interfaces/ArchitectureAppStore';
import { ActionT } from '../../interfaces/Action';
import { ArticleEditLangRedux } from '../../interfaces/DispatchInterfaces';

const initialArticlesState: Article[] = [];

function articles(state = initialArticlesState, action: ActionT<Article & ArticleEditLangRedux>) {
    switch (action.type) {
        case ArticlesActions.LOAD_ARTICLE: {
            if (findArticleById(state, action.payload.id)) {
                return state;
            }
            return [
                ...state,
                action.payload
            ]
        }
        case ArticlesActions.EDIT_ARTICLE_LANG:
            console.log(action)
            return state.map((article: Article) => {
                if (article.id === action.payload.id) {
                    console.log('iguales')
                    let updatedArticle: Article = article;
                    if (article.mainImage) {

                    }
                    if (updatedArticle.admin) {
                        updatedArticle.admin.localContent = {
                            ...article.admin?.localContent,
                            ...action.payload.localContent
                        }
                    }
                    return updatedArticle
                }
                return article;
            })
        default:
            return state
    }
}

function findArticleById(state: Article[], articleId: string): Article | undefined {
    const found = state.find(article => article.id === articleId)
    return found;
}

export default articles;