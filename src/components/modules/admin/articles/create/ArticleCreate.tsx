import React from "react";
import { LangEnum, csrfHeaderName, defaultLang, tokenAttributeName } from "../../../../../constants/appConstants";
import { languagesArray } from '../../../../../constants/appConstants';
import ValidationMessages from '../../../../../shared/ValidationMessages/ValidationMessages';
import api from '../../../../../util/api';
import { ErrorMessages, ValidatorsByField } from "../../AdminInterfaces";

const createLangOptions = () => {
    return (
        languagesArray.map((lang: string) => {
            return <option key={lang} value={lang}>{lang}</option>
        })
    )
}

enum ArticleFields {
    COUNTRY = 'country',
    TITLE = 'title',
    CONTENT = 'content',
}

const validators: ValidatorsByField = {
    [ArticleFields.TITLE]: (value: string) => {
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
    [ArticleFields.TITLE]: (value: LangEnum) => {
        return value.length > 2 ? ["maximum 2 characaters required"] : null;
    }
}

interface ImageUrlModel{
    url:string
}

interface ImageBindingModel extends ImageUrlModel{
    name: string
}

interface ArticleCreateModel {
    country: LangEnum,
    title: string,
    content: string,
    mainImage?: ImageBindingModel
}

interface ArticleCreateState {
    article: ArticleCreateModel,
    errors: ErrorMessages
}

class ArticleCreate extends React.PureComponent<any, ArticleCreateState> {
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

    handleChange = (event: React.BaseSyntheticEvent) => {
        event.preventDefault();

    }



    render() {
        return (
            <div>
                <h1>Article Create</h1>

                <form >
                    <select value={this.state.article.country} name={ArticleFields.COUNTRY} onChange={this.handleChange}>
                        {createLangOptions()}
                    </select>

                    <input type='text' value={this.state.article.title} name={ArticleFields.TITLE} onChange={this.handleChange} />

                    <textarea  value={this.state.article.content} name={ArticleFields.CONTENT} onChange={this.handleChange} />


                    
                    {/* <ValidationMessages validationErrors={null} />  */}

                    <button >Create</button>
                </form>


            </div>
        );
    }
}

export default ArticleCreate;