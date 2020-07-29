import React, { FormEvent } from "react";
import api from '../../../../../util/api';
import { getTokenHeader } from "../../../../../util/utilFunctions";
import { RouteComponentProps } from "react-router-dom";
import { ArticleTitleContent, ErrorMessages } from "../../AdminInterfaces";
import ValidationMessages from "../../../../../shared/ValidationMessages/ValidationMessages";
import { ArticleFields } from "../create/ArticleCreate";
import { langValidators } from "../addLang/ArticleAddLang";


interface ArticleEditLangRouterParams {
    articleId: string,
    lang: string
}

interface ArticleEditLangProps extends RouteComponentProps<ArticleEditLangRouterParams> {

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


    loadArticle() {
        const articleId = this.props.match.params.articleId;
        const lang = this.props.match.params.lang;
        api
            .get(`/admin/articles/edit/${articleId}/${lang}`, getTokenHeader())
            .then((res) => {
                console.log(res.data);
                this.setState({
                    article: res.data,
                    errors: this.getInitialErrors(res.data)
                })
            })
            .catch((e: any) => {
                console.log(e)
            });
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
        if(isFormPristine){
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

export default ArticleEditLang;