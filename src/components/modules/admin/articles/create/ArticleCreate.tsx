import React, { FormEvent } from "react";
import { connect } from "react-redux";
import { LangEnum, csrfHeaderName, defaultLang, tokenAttributeName } from "../../../../../constants/appConstants";
import { languagesArray } from '../../../../../constants/appConstants';
import ValidationMessages from '../../../../../shared/ValidationMessages/ValidationMessages';
import api from '../../../../../util/api';
import { ErrorMessages, ValidatorsByField, ImageModel } from "../../AdminInterfaces";
import ArchitectureAppStore, { Category } from "../../../../../redux/interfaces/ArchitectureAppStore";
import { textFieldValidator } from "../../util/ValidationFunctions";

const createLangOptions = () => {
    return (
        languagesArray.map((lang: string) => {
            return <option key={lang} value={lang}>{lang}</option>
        })
    )
}

const createCategoryOptions = (categories: Category[]) => {
    return (
        categories.map((category: Category) => {
            return <option key={category.id} value={category.id}>{category.name}</option>
        })
    )
}

enum ArticleFields {
    COUNTRY = 'country',
    TITLE = 'title',
    CONTENT = 'content',
    MAIN_IMAGE = 'mainImage',
    MAIN_IMAGE_NAME = 'mainImage.name',
    MAIN_IMAGE_URL = 'mainImage.url',
    CATEGORY_ID = 'categoryId'
}

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
        validationFunction: (newState: ArticleCreateState) => {
            if (!newState.article.mainImage?.name && !newState.article.mainImage?.url) {
                return null;
            }
            if (!newState.article.mainImage?.name || !newState.article.mainImage?.url) {
                return ['Image not valid'];
            }
            if (!newState.errors[ArticleFields.MAIN_IMAGE_NAME].messages && !newState.errors[ArticleFields.MAIN_IMAGE_URL].messages) {
                return null;
            }
            return ['Image not valid'];
        }
    },
    [ArticleFields.MAIN_IMAGE_NAME]: {
        validationFunction: textFieldValidator,
        conditions: {
            allowEmpty: true,
            min: 2,
            beginUppercase: true
        }
    },
    [ArticleFields.MAIN_IMAGE_URL]: {
        validationFunction: (value: string) => {
            if (!value) {
                return null;
            }
            return value.length < 2 ? ["minimum 2 characaters required"] : null;
        }
    }
}

interface ArticleCreateModel {
    country: LangEnum,
    title: string,
    content: string,
    mainImage?: ImageModel,
    categoryId: string
}

interface ArticleCreateProps {
    categories: Category[]
}

interface ArticleCreateState {
    article: ArticleCreateModel,
    errors: ErrorMessages
}

class ArticleCreate extends React.PureComponent<ArticleCreateProps, ArticleCreateState> {
    constructor(props: any) {
        super(props);
        this.state = {
            article: {
                country: defaultLang,
                title: 'Ä',
                content: 'Le château dit des dames',
                categoryId: this.props.categories.length > 0 ? this.props.categories[0].id : ''
            },
            errors: {}
        };
    }

    componentDidMount() {
        this.setInitialErrors();
    }

    componentWillReceiveProps(props: ArticleCreateProps) {
        this.setState({
            article: {
                ...this.state.article,
                categoryId: props.categories.length > 0 ? props.categories[0].id : ''
            }
        })
    }

    setInitialErrors() {
        let initialErrors: ErrorMessages = {};
        Object.entries(ArticleFields)
            .forEach(entry => {
                const fieldValidator = validators[entry[1]];
                if (entry[1] === ArticleFields.MAIN_IMAGE || !fieldValidator) {
                    return;
                }
                const fieldValidatorFunction = validators[entry[1]].validationFunction;
                const fieldConditions = validators[entry[1]].conditions;
                const currentErrrorMessage = fieldValidatorFunction((this.state.article as any)[entry[1]], fieldConditions)
                initialErrors[entry[1]] = {
                    isTouched: false,
                    messages: currentErrrorMessage
                }
            });

        initialErrors[ArticleFields.MAIN_IMAGE] = {
            isTouched: false,
            messages: validators[ArticleFields.MAIN_IMAGE].validationFunction({ article: this.state.article, errors: initialErrors })
        }

        this.setState({
            errors: initialErrors
        })
    }

    handleChange = (event: React.BaseSyntheticEvent) => {
        event.preventDefault();
        const { name, value } = event.target;

        let newArticle: ArticleCreateModel = {
            ...this.state.article
        }
        this.setNestedKey(newArticle, name, value);


        let newErrors: any = {
            ...this.state.errors
        }

        const fieldValidator = validators[name];
        if (!!fieldValidator) {
            const conditions = fieldValidator.conditions;
            newErrors[name] = {
                isTouched: true,
                messages: fieldValidator.validationFunction(value, conditions)
            }
            newErrors[ArticleFields.MAIN_IMAGE] = {
                isTouched: true,
                messages: validators[ArticleFields.MAIN_IMAGE].validationFunction({ article: newArticle, errors: newErrors })
            }
        }

        this.setState({
            article: newArticle,
            errors: newErrors
        });
    }

    setNestedKey(obj: any, path: string, value: any) {
        if (!path.includes('.')) {
            obj[path] = value;
            return obj;
        }
        const pList = path.split('.');
        const key = pList.pop();
        if (!key) {
            return obj;
        }
        const pointer = pList.reduce((accumulator, currentValue) => {
            if (accumulator[currentValue] === undefined) accumulator[currentValue] = {};
            return accumulator[currentValue];
        }, obj);
        pointer[key] = value;
        return obj;
    }

    shouldDisableSubmit(): boolean {
        return !!Object.entries(this.state.errors).find(entry => entry[1].messages);
    }

    handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const config = {
            headers: {
                [csrfHeaderName]: localStorage.getItem(tokenAttributeName)
            }
        };

        const article = {
            ...this.state.article,
            country: this.state.article.country.toUpperCase()
        }

        api
            .post(`/admin/articles/create`, article, config)
            .then((res) => {
                console.log(res.data);
            })
            .catch((e: any) => {
                console.log(e)
            });

        console.log('submittted')
    }



    render() {
        return (
            <div>
                <h1>Article Create</h1>

                <form onSubmit={this.handleSubmit}>
                    <div>
                        <div>Id {this.state.article.categoryId}</div>
                        <select value={this.state.article.categoryId} name={ArticleFields.CATEGORY_ID} onChange={this.handleChange}>
                            {createCategoryOptions(this.props.categories)}
                        </select>

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

                    <div>
                        <input
                            type='text'
                            value={this.state.article.mainImage?.name}
                            name={ArticleFields.MAIN_IMAGE_NAME}
                            onChange={this.handleChange} />
                        <ValidationMessages validationErrors={this.state.errors[ArticleFields.MAIN_IMAGE_NAME]} />
                    </div>

                    <div>
                        <input
                            type='text'
                            value={this.state.article.mainImage?.url}
                            name={ArticleFields.MAIN_IMAGE_URL}
                            onChange={this.handleChange} />
                        <ValidationMessages validationErrors={this.state.errors[ArticleFields.MAIN_IMAGE_URL]} />
                    </div>
                    <ValidationMessages validationErrors={this.state.errors[ArticleFields.MAIN_IMAGE]} />

                    <button disabled={this.shouldDisableSubmit()}>Create</button>
                </form>


            </div>
        );
    }
}

const mapStateToProps = (state: ArchitectureAppStore) => ({
    categories: state.categories
});

export default connect(mapStateToProps)(ArticleCreate);