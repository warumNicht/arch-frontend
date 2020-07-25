import React from "react";
import { connect } from "react-redux";
import { LangEnum, csrfHeaderName, defaultLang, tokenAttributeName } from "../../../../../constants/appConstants";
import { languagesArray } from '../../../../../constants/appConstants';
import ValidationMessages from '../../../../../shared/ValidationMessages/ValidationMessages';
import api from '../../../../../util/api';
import { ErrorMessages, ValidatorsByField } from "../../AdminInterfaces";
import ArchitectureAppStore, { Category } from "../../../../../redux/interfaces/ArchitectureAppStore";

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
    [ArticleFields.CONTENT]: (value: string) => {
        let messages: string[] = [];
        if (value.length === 0) {
            messages.push("Should not be empty");
        }
        if (value.length < 3) {
            messages.push("minimum 3 characaters required")
        }
        if (value.length > 0 && value.charAt(0) !== value.charAt(0).toUpperCase()) {
            messages.push("Should begin with uppercase");
        }

        return messages.length > 0 ? messages : null;
    },
    [ArticleFields.TITLE]: (value: string) => {
        return value.length < 2 ? ["minimum 2 characaters required"] : null;
    },
    [ArticleFields.MAIN_IMAGE]: (newState: ArticleCreateState) => {
        if (!newState.errors[ArticleFields.MAIN_IMAGE_NAME].messages && !newState.errors[ArticleFields.MAIN_IMAGE_URL].messages) {
            return null;
        }
        const res = !newState.article.mainImage?.name || !newState.article.mainImage?.url;
        return res ? ['Image not valid'] : null;
    },
    [ArticleFields.MAIN_IMAGE_NAME]: (value: string) => {
        if (!value) {
            return null;
        }
        return value.length < 2 ? ["minimum 2 characaters required"] : null;
    },
    [ArticleFields.MAIN_IMAGE_URL]: (value: string) => {
        if (!value) {
            return null;
        }
        return value.length < 2 ? ["minimum 2 characaters required"] : null;
    }
}

interface ImageUrlModel {
    url: string
}

interface ImageBindingModel extends ImageUrlModel {
    name: string
}

interface ArticleCreateModel {
    country: LangEnum,
    title: string,
    content: string,
    mainImage?: ImageBindingModel,
    categoryId?: string
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
                title: 'Château de Chenonceau',
                content: 'Le château dit des dames'
            },
            errors: {}
        };
    }

    componentDidMount() {
        this.setInitialErrors();
    }

    setInitialErrors() {
        let initialErrors: ErrorMessages = {};
        Object.entries(ArticleFields)
            .forEach(entry => {
                const fieldValidator = validators[entry[1]];
                if (entry[1] === ArticleFields.MAIN_IMAGE || !fieldValidator) {
                    return;
                }
                const currentErrrorMessage = fieldValidator((this.state.article as any)[entry[1]])
                initialErrors[entry[1]] = {
                    isTouched: false,
                    messages: currentErrrorMessage
                }
            });

        initialErrors[ArticleFields.MAIN_IMAGE] = {
            isTouched: false,
            messages: validators[ArticleFields.MAIN_IMAGE]({ article: this.state.article, errors: initialErrors })
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
            newErrors[name] = {
                isTouched: true,
                messages: fieldValidator(value)
            }
            newErrors[ArticleFields.MAIN_IMAGE] = {
                isTouched: true,
                messages: validators[ArticleFields.MAIN_IMAGE]({ article: newArticle, errors: newErrors })
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



    render() {
        return (
            <div>
                <h1>Article Create</h1>

                <form >
                    <div>
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
                    </div>

                    <div>
                        <textarea value={this.state.article.content} name={ArticleFields.CONTENT} onChange={this.handleChange} />
                    </div>

                    <div>
                        <input
                            type='text'
                            value={this.state.article.mainImage?.name}
                            name={ArticleFields.MAIN_IMAGE_NAME}
                            onChange={this.handleChange} />
                    </div>

                    <div>
                        <input
                            type='text'
                            value={this.state.article.mainImage?.url}
                            name={ArticleFields.MAIN_IMAGE_URL}
                            onChange={this.handleChange} />
                    </div>


                    {/* <ValidationMessages validationErrors={null} />  */}

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