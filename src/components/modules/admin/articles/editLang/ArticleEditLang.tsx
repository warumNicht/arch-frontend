import React, { FormEvent } from "react";
import { connect } from "react-redux";
import api from '../../../../../util/api';
import { getTokenHeader } from "../../../../../util/utilFunctions";
import { RouteComponentProps } from "react-router-dom";
import { ArticleTitleContent, ErrorMessages } from "../../AdminInterfaces";
import ValidationMessages from "../../../../../shared/ValidationMessages/ValidationMessages";
import { ArticleFields } from "../create/ArticleCreate";
import { langValidators } from "../addLang/ArticleAddLang";
import ArchitectureAppStore, { Article, User, LocalContent, LanguageContent } from "../../../../../redux/interfaces/ArchitectureAppStore";
import { editArticleLang, setCurrentUser, loadArticle } from "../../../../../redux/actions/actionCreators";
import { ArticleEditLangRedux } from "../../../../../redux/interfaces/DispatchInterfaces";
import { AxiosResponse } from "axios";


interface ArticleEditLangRouterParams {
    articleId: string,
    lang: string
}

interface ArticleEditLangProps extends RouteComponentProps<ArticleEditLangRouterParams> {
    editedArticle: Article | undefined,
    updateArticleLang: (article: ArticleEditLangRedux) => void,
    loadArticleInRedux: (article: Article) => void
}

interface ArticleEditLangModel extends ArticleTitleContent {
    mainImage?: string
}

interface ArticleEditLangState {
    article: ArticleEditLangModel,
    errors: ErrorMessages
}

class ArticleEditLang extends React.PureComponent<ArticleEditLangProps, ArticleEditLangState> {

    constructor(props: any) {
        super(props);
        this.state = {
            article: {
                title: '',
                content: ''
            },
            errors: {}
        }
    }

    componentDidMount() {
        this.loadArticle();
    }

    componentWillReceiveProps(props:ArticleEditLangProps){
        console.log(props)
        console.log(props.editedArticle)
    }


    loadArticle() {
        console.log(this.props.editedArticle)
        if (!this.props.editedArticle) {
            this.fetchWholeArticle();
            return;
        }
        if (!this.props.editedArticle.admin) {
            this.fetchAdminArtibutes();
            return;
        }

        const languageContent: LanguageContent = this.props.editedArticle.admin.localContent[this.props.match.params.lang];
        if (languageContent && languageContent.content) {
            this.loadArticleFromStore();
            return;
        }else{
            this.fetchArticleContent();
        }

        // const articleId = this.props.match.params.articleId;
        // const lang = this.props.match.params.lang;
        // api
        //     .get(`/admin/articles/edit/${articleId}/${lang}`, getTokenHeader())
        //     .then((res) => {
        //         console.log(res.data);
        //         this.setState({
        //             article: res.data,
        //             errors: this.getInitialErrors(res.data)
        //         })
        //     })
        //     .catch((e: any) => {
        //         console.log(e)
        //     });
    }

    fetchWholeArticle() {
        const articleId = this.props.match.params.articleId;
        const lang = this.props.match.params.lang;
        api
            .get(`/admin/articles/edit/${articleId}/${lang}/all`, getTokenHeader())
            .then((res: AxiosResponse<Article>) => {
                console.log(res.data);
                const article: Article = res.data;
                this.props.loadArticleInRedux(article);

                if(article.admin){
                    let articleToEdit: ArticleEditLangModel = {
                        title: article.admin.localContent[lang].title,
                        content: article.admin.localContent[lang].content || ''
                    }
                    if (article.admin.localContent[lang].mainImageName) {
                        articleToEdit.mainImage = article.admin.localContent[lang].mainImageName
                    }
                    this.setState({
                        article: articleToEdit
                    })
                }

           
            })
            .catch((e: any) => {
                console.log(e)
            });

    }

    fetchAdminArtibutes() {

    }

    fetchArticleContent() {

    }

    loadArticleFromStore() {
        const localContent: LanguageContent | undefined = this.props.editedArticle?.admin?.localContent[this.props.match.params.lang];
        if (localContent) {
            let articleToEdit: ArticleEditLangModel = {
                title: localContent.title,
                content: localContent.content || ''
            }
            if (localContent.mainImageName) {
                articleToEdit.mainImage = localContent.mainImageName
            }
            this.setState({
                article: articleToEdit
            })
        }

    }

    getInitialErrors(article: ArticleEditLangModel): ErrorMessages {
        let initialErrors: ErrorMessages = {};
        Object.entries(langValidators)
            .forEach(entry => {
                const fieldValidatorFunction = entry[1].validationFunction;
                const fieldConditions = entry[1].conditions;
                const currentErrorMessage = fieldValidatorFunction((article as any)[entry[0]], fieldConditions);
                initialErrors[entry[0]] = {
                    isTouched: false,
                    messages: currentErrorMessage
                }
            });
        return initialErrors;
    }

    handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const articleId = this.props.match.params.articleId;
        const lang = this.props.match.params.lang;

        api
            .patch(`/admin/articles/edit/${articleId}/${lang}`, this.state.article, getTokenHeader())
            .then((res) => {
                console.log(res.data);
                let editedArticle: ArticleEditLangRedux = {
                    id: articleId,
                    // mainImage: this.state.article.mainImage ? this.state.article.mainImage : undefined,
                    localContent: {
                        [lang]: {
                            title: this.state.article.title,
                            content: this.state.article.content,
                            mainImageName: this.state.article.mainImage ? this.state.article.mainImage : undefined
                        }
                    }
                }

                console.log(this.props.updateArticleLang);
                this.props.updateArticleLang(editedArticle);
                // store.dispatch(editArticleLang(editedArticle))
            })
            .catch((e: any) => {
                console.log(e)
            });
    }

    handleChange = (event: React.BaseSyntheticEvent) => {
        event.preventDefault();
        const { name, value } = event.target;

        const fieldValidatorFunction = langValidators[name].validationFunction;
        const fieldConditions = langValidators[name].conditions;
        const currentErrorMessage = fieldValidatorFunction(value, fieldConditions);

        this.setState({
            article: {
                ...this.state.article,
                [name]: value
            },
            errors: {
                ...this.state.errors,
                [name]: {
                    isTouched: true,
                    messages: currentErrorMessage
                }
            }
        })
    }

    shouldDisableSubmit(): boolean {
        const isFormPristine: boolean = !Object.entries(this.state.errors).find(entry => entry[1].isTouched);
        if (isFormPristine) {
            return true;
        }
        return !!Object.entries(this.state.errors).find(entry => entry[1].messages);
    }

    render() {
        return (
            <div>
                <div>Article edit lang</div>
                <form onSubmit={this.handleSubmit}>
                    <div>
                        <input
                            type='text'
                            value={this.state.article.title}
                            name={ArticleFields.TITLE}
                            onChange={this.handleChange} />
                        <ValidationMessages validationErrors={this.state.errors[ArticleFields.TITLE]} />
                    </div>

                    <div>
                        <textarea value={this.state.article.content} name={ArticleFields.CONTENT} onChange={this.handleChange} />
                        <ValidationMessages validationErrors={this.state.errors[ArticleFields.CONTENT]} />
                    </div>

                    {this.state.article.mainImage !== null ?
                        <div>
                            <input
                                type='text'
                                value={this.state.article.mainImage}
                                name={ArticleFields.MAIN_IMAGE}
                                onChange={this.handleChange} />
                            <ValidationMessages validationErrors={this.state.errors[ArticleFields.MAIN_IMAGE]} />
                        </div>
                        :
                        ''
                    }
                    <button disabled={this.shouldDisableSubmit()}>Edit language</button>
                </form>
            </div>
        )
    }
}

const mapStateToProps = (state: ArchitectureAppStore, ownProps: ArticleEditLangProps) => {
    const editedArticleId: string = ownProps.match.params.articleId;
    const allArticles: Article[] = state.articlesByCategories.articles;
    const found = allArticles.find((article: Article) => article.id.toString() === editedArticleId);
    console.log(state.articlesByCategories.articles)
    const res = {
        editedArticle: found,
    }
    return res;
};

const mapDispatchToProps = (dispatch: any) => ({
    updateArticleLang: (article: ArticleEditLangRedux) => dispatch(editArticleLang(article)),
    loadArticleInRedux: (article: Article) => dispatch(loadArticle(article))
});

export default connect(mapStateToProps, mapDispatchToProps)(ArticleEditLang);