import React, { FormEvent } from "react";
import { connect } from "react-redux";
import api from '../../../../../util/api';
import { defaultLang } from "../../../../../constants/appConstants";
import { ArticleBaseModel, ErrorMessages, ValidatorsByField } from "../../AdminInterfaces";
import { ArticleFields } from "../create/ArticleCreate";
import { createLangOptions } from "../../../../../util/renderFunctions";
import ValidationMessages from "../../../../../shared/ValidationMessages/ValidationMessages";
import { getTokenHeader } from "../../../../../util/utilFunctions";
import { textFieldValidator } from "../../util/ValidationFunctions";
import { RouteComponentProps } from "react-router-dom";
import { ArticleIdRouterParams } from "../edit/ArticleEdit";
import ArchitectureAppStore, { Article } from "../../../../../redux/interfaces/ArchitectureAppStore";
import { articleAddLang } from "../../../../../redux/actions/actionCreators";

export const langValidators: ValidatorsByField = {
    [ArticleFields.TITLE]: {
        validationFunction: textFieldValidator,
        conditions: {
            allowEmpty: false,
            min: 2,
            max: 100,
            beginUppercase: true
        }
    },
    [ArticleFields.CONTENT]: {
        validationFunction: textFieldValidator,
        conditions: {
            allowEmpty: false,
            min: 5,
            beginUppercase: true
        }
    },
    [ArticleFields.MAIN_IMAGE]: {
        validationFunction: textFieldValidator,
        conditions: {
            allowEmpty: false,
            min: 2,
            beginUppercase: true
        }
    }
}

interface ArticleAddLangModel extends ArticleBaseModel {
    mainImage?: string
}

interface ArticleAddLangProps extends RouteComponentProps<ArticleIdRouterParams>{
    editedArticle: Article | undefined
}

interface ArticleAddLangState {
    article: ArticleAddLangModel,
    errors: ErrorMessages
}

class ArticleAddLang extends React.PureComponent<ArticleAddLangProps, ArticleAddLangState> {
    constructor(props: any) {
        super(props);
        this.state = {
            article: {
                country: defaultLang,
                title: '',
                content: ''
            },
            errors: {}
        }
    }

    componentDidMount() {
        const articleId = this.props.match.params.articleId;
        console.log(articleId)
        this.loadArticle();
    }

    loadArticle() {
        if(this.props.editedArticle){
            this.handleResposne(!!this.props.editedArticle.mainImage);
            return;
        }
        const articleId = this.props.match.params.articleId;
        api
            .get(`/admin/articles/addLang/${articleId}`, getTokenHeader())
            .then((res) => {
                console.log(res.data);
                this.handleResposne(res.data);
            })
            .catch((e: any) => {
                console.log(e)
            });
    }

    handleResposne(hasMainImage: boolean): void{
        let newArticle = {
            ...this.state.article
        }
        if (hasMainImage) {
            newArticle.mainImage = '';
            this.setState({
                article: newArticle,
                errors: this.getInitialErrors(newArticle)
            })
        }
    }

    loadArticleFromStore(){
        let articleToState: ArticleAddLangModel = {
            ...this.state.article
        }
    }

    getInitialErrors(article: ArticleAddLangModel): ErrorMessages {
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

    handleChange = (event: React.BaseSyntheticEvent) => {
        event.preventDefault();
        const { name, value } = event.target;
        const fieldValidator = langValidators[name];

        if (fieldValidator) {
            const fieldValidatorFunction = fieldValidator.validationFunction;
            const fieldConditions = fieldValidator.conditions;
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
        } else {
            this.setState({
                article: {
                    ...this.state.article,
                    [name]: value
                }
            })
        }
    }

    shouldDisableSubmit(): boolean {
        const isFormPristine: boolean = !Object.entries(this.state.errors).find(entry => entry[1].isTouched);
        if (isFormPristine) {
            return true;
        }
        return !!Object.entries(this.state.errors).find(entry => entry[1].messages);
    }

    handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const article = {
            ...this.state.article,
            country: this.state.article.country.toUpperCase()
        }

        api
            .post(`/admin/articles/addLang/${this.props.match.params.articleId}`, article, getTokenHeader())
            .then((res) => {
                console.log(res.data);
            })
            .catch((e: any) => {
                console.log(e)
            });
    }

    render() {
        return (
            <div>
                <div>Article add language</div>
                <form onSubmit={this.handleSubmit}>
                    <div>
                        <select value={this.state.article.country} name={ArticleFields.COUNTRY} onChange={this.handleChange}>
                            {createLangOptions()}
                        </select>
                    </div>

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

                    {this.state.article.mainImage !== undefined ?
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
                    <button disabled={this.shouldDisableSubmit()}>Add language</button>

                </form>
            </div>
        )
    }
}

const mapStateToProps = (state: ArchitectureAppStore, ownProps: ArticleAddLangProps) => {
    const editedArticleId: string = ownProps.match.params.articleId;
    return {
        editedArticle: state.articlesByCategories.articles.find((article: Article)=> article.id === editedArticleId)
    }
};

const mapDispatchToProps = (dispatch: any) => ({
    addLangToArticleInStore: (article: any) => dispatch(articleAddLang(article))
});

export default connect(mapStateToProps, mapDispatchToProps)(ArticleAddLang);