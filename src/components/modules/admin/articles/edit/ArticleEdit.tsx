import React, { FormEvent } from "react";
import { connect } from "react-redux";
import api from '../../../../../util/api';
import ArchitectureAppStore, { Category, Article, LocalContent } from "../../../../../redux/interfaces/ArchitectureAppStore";
import { RouteComponentProps, Link } from "react-router-dom";
import { ErrorMessages, ImageUrlModel} from "../../AdminInterfaces";
import { getTokenHeader } from "../../../../../util/utilFunctions";
import { getLangPrefix } from "../../../../../util/LangPrefixUtil";
import { loadArticle } from "../../../../../redux/actions/actionCreators";
import articles from "../../../../../redux/reducers/articles/articles";
import { AxiosResponse } from "axios";

export interface ArticleIdRouterParams {
    articleId: string
}

interface ArticleEditProps extends RouteComponentProps<ArticleIdRouterParams> {
    categories: Category[],
    editedArticle: Article | undefined,
    loadArticleInRedux: (article: Article) => void
}

interface ArticleEditModel {
    id: string,
    categoryId: string,
    mainImage?: ImageUrlModel,
    localContent: LocalContent
}

interface ArticleEditState {
    article: ArticleEditModel,
    errors: ErrorMessages
}

class ArticleEdit extends React.PureComponent<ArticleEditProps, ArticleEditState> {
    articleId: string = '';
    langPrefix: string = getLangPrefix(this.props.match.path);
    constructor(props: ArticleEditProps) {
        super(props);
        this.state = {
            article: {
                id: '',
                categoryId: '',
                localContent: {}
            },
            errors: {}
        }
    }

    componentDidMount() {
        this.articleId = this.props.match.params.articleId;
        this.loadArticle();
    }

    loadArticle() {
        const articleId = this.props.match.params.articleId;
        const found: Article | undefined = this.props.editedArticle;
        if (found && found.admin?.localContent) {
            this.loadArticleFromStore(found);
            return;
        }

        api
            .get(`/admin/articles/edit/${articleId}`, getTokenHeader())
            .then((res: AxiosResponse<ArticleEditModel>) => {
                console.log(res.data);
                this.updateArticleInStore(articleId, res.data);

                this.setState({
                    article: res.data
                });
            })
            .catch((e: any) => {
                console.log(e)
            });
    }

    loadArticleFromStore(found: Article) {
        let articleToEdit: ArticleEditModel = {
            id: found.id,
            categoryId: found.categoryId,
            localContent: found.admin ? found.admin.localContent : {},
        };
        if (found.mainImage) {
            articleToEdit.mainImage = { url: found.mainImage.url }
        }
        this.setState({
            article: articleToEdit
        })
    }

    updateArticleInStore(articleId: string, editedArticle: ArticleEditModel) {
        let article: Article = {
            id: articleId,
            title: editedArticle.localContent[this.langPrefix.toUpperCase()].title,
            categoryId: editedArticle.categoryId,
            admin: {
                localContent: editedArticle.localContent
            }
        }
        if (editedArticle.mainImage) {
            article.mainImage = { url: editedArticle.mainImage.url };
        }
        this.props.loadArticleInRedux(article);
    }

    createLanguageDivs(localContent: LocalContent) {
        return (
            Object.entries(localContent).map((entry: any) => {
                return <div key={entry[0]}>
                    <div>{entry[0]}</div>
                    <div>{entry[1].title}</div>
                    <Link to={`/${this.langPrefix}/admin/articles/edit/${this.articleId}/${entry[0]}`}>Edit {entry[0]}</Link>
                </div>
            })
        )
    }

    render() {
        const articleId: string = this.props.match.params.articleId;
        const langPrefix: string = getLangPrefix(this.props.match.path);
        return (
            <div>
                Article edit {this.articleId}
                <div>
                    {this.state.article.mainImage ?
                        <div>
                            <img src={this.state.article.mainImage.url} />
                            <button>Change main image</button>
                        </div>
                        :
                        <div>
                            <button>Add main image</button>
                        </div>}
                </div>

                <div>
                    {this.createLanguageDivs(this.state.article.localContent)}
                </div>
                <div>
                    <Link to={`/${this.langPrefix}/admin/articles/addLang/${this.articleId}`}>Add language</Link>
                </div>
            </div>

        )
    }
}

const mapStateToProps = (state: ArchitectureAppStore, ownProps: ArticleEditProps) => {
    const editedArticleId: string = ownProps.match.params.articleId;
    return {
        editedArticle: state.articlesByCategories.articles.find((article: Article)=> article.id === editedArticleId)
    }
};

const mapDispatchToProps = (dispatch: any) => ({
    loadArticleInRedux: (article: Article) => dispatch(loadArticle(article))
});

export default connect(mapStateToProps, mapDispatchToProps)(ArticleEdit);