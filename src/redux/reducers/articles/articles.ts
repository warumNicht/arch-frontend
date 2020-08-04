import { ArticlesActions } from '../../actions/ActionTypes';
import { Article } from '../../interfaces/ArchitectureAppStore';
import { ActionT } from '../../interfaces/Action';
import { ArticleEditLangRedux, ArticleLangRedux, AddAdminContentRedux, ArticleContentRedux } from '../../interfaces/DispatchInterfaces';

const initialArticlesState: Article[] = [];

function articles(state = initialArticlesState,
    action: ActionT<Article & Article[] & ArticleEditLangRedux & ArticleLangRedux & AddAdminContentRedux & ArticleContentRedux>) {
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
        case ArticlesActions.LOAD_LIST_OF_ARTICLES: {
            let notContainedArticles: Article[] = [];

            action.payload.forEach((article: Article) => {
                const found = findArticleById(state, article.id);
                if (!found) {
                    notContainedArticles.push(article);
                }
            })
            console.log(notContainedArticles)
            return [
                ...state,
                ...notContainedArticles
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
        case ArticlesActions.ADD_LANG: {
            if (findArticleById(state, action.payload.id)) {
                return state;
            }
            return state.map((article: Article) => {
                if (article.id === action.payload.id) {
                    console.log('iguales')
                    let updatedArticle: Article = article;
                    if (article.mainImage) {
                        article.mainImage.name = action.payload.mainImageName
                    }
                    if (updatedArticle.admin) {
                        updatedArticle.admin = {
                            ...article.admin,
                            localContent: {
                                ...article.admin?.localContent,
                                [action.payload.country]: {
                                    title: action.payload.title,
                                    content: action.payload.content
                                }
                            }
                        }
                    } else {
                        updatedArticle.admin = {
                            localContent: {
                                [action.payload.country]: {
                                    title: action.payload.title,
                                    content: action.payload.content
                                }
                            }
                        }
                    }

                    if (action.payload.isCurrentLanguageEdited) {
                        updatedArticle.title = action.payload.title;
                        updatedArticle.content = action.payload.content;
                        if (updatedArticle.mainImage) {
                            updatedArticle.mainImage = {
                                ...updatedArticle.mainImage,
                                name: action.payload.mainImageName
                            }
                        }
                    }
                    return updatedArticle
                }
                return article;
            })
        }
        case ArticlesActions.ADD_ADMIN_CONTENT: {
            return state.map((article: Article) => {
                if (article.id.toString() === action.payload.id) {
                    let updatedArticle = {
                        ...article,
                        admin: {
                            localContent: action.payload.localContent
                        }
                    }
                    return updatedArticle;
                }
                return article;
            })
        }
        case ArticlesActions.ADD_CONTENT: {
            return state.map((article: Article) => {
                if (article.id.toString() === action.payload.id) {
                    const langContent = article.admin?.localContent[action.payload.country];
                    let updatedArticle = {
                        ...article,
                        admin: {
                            ...article.admin,
                            localContent: {
                                ...article.admin?.localContent,
                                [action.payload.country]: {
                                    ...langContent,
                                    content: action.payload.content,
                                    // mainImageName: ''
                                }
                            }
                        }
                    }
                    if(action.payload.mainImageName){
                        (updatedArticle.admin.localContent as any)[action.payload.country].mainImageName = action.payload.mainImageName;      
                    }
                    return updatedArticle;
                }
                return article;
            })
        }
        default:
            return state
    }
}

function findArticleById(state: Article[], articleId: string): Article | undefined {
    const found = state.find(article => article.id === articleId)
    return found;
}

export default articles;