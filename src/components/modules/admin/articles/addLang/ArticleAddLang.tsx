import React, { FormEvent } from "react";
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

const validators: ValidatorsByField = {
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

interface ArticleAddLangState {
    article: ArticleAddLangModel,
    errors: ErrorMessages
}

class ArticleAddLang extends React.PureComponent<RouteComponentProps<ArticleIdRouterParams>, ArticleAddLangState> {
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
        this.setInitialErrors();
    }

    loadArticle() {
        const articleId = this.props.match.params.articleId;
        api
            .get(`/admin/articles/addLang/${articleId}`, getTokenHeader())
            .then((res) => {
                console.log(res.data);
                if (res.data) {
                    this.setState({
                        article: {
                            ...this.state.article,
                            mainImage: ''
                        }
                    })
                }
            })
            .catch((e: any) => {
                console.log(e)
            });
    }

    setInitialErrors() {
        let initialErrors: ErrorMessages = {};
        Object.entries(validators)
            .forEach(entry => {
                const fieldValidatorFunction = entry[1].validationFunction;
                const fieldConditions = entry[1].conditions;
                const currentErrorMessage = fieldValidatorFunction((this.state.article as any)[entry[0]], fieldConditions);
                initialErrors[entry[0]] = {
                    isTouched: false,
                    messages: currentErrorMessage
                }
            });

        this.setState({
            errors: initialErrors
        })
    }

    handleChange = (event: React.BaseSyntheticEvent) => {
        event.preventDefault();
        const { name, value } = event.target;
        const fieldValidator = validators[name];

        if(fieldValidator){
            const fieldValidatorFunction = fieldValidator.validationFunction;
            const fieldConditions = fieldValidator.conditions;
            const currentErrorMessage = fieldValidatorFunction(value, fieldConditions);

            this.setState({
                article: {
                    ...this.state.article,
                    [name] : value
                },
                errors:{
                    ...this.state.errors,
                    [name]:{
                        isTouched: true,
                        messages: currentErrorMessage
                    }
                }
            })
        }else{
            this.setState({
                article: {
                    ...this.state.article,
                    [name] : value
                }
            })
        }  
    }

    shouldDisableSubmit(): boolean {
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

export default ArticleAddLang;