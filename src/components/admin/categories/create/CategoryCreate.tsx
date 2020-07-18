import React from "react";
import { Switch, Route, Redirect, RouteComponentProps } from "react-router-dom";
import { LangEnum } from "../../../../constants/appConstants";
import { languagesArray } from '../../../../constants/appConstants';

const createLangOptions = () => {
    return (
        languagesArray.map((lang: string) => {
            return <option key={lang} value={lang}>{lang}</option>
        })
    )
}

enum CategoryFields {
    LANGUAGE = 'language',
    NAME = 'name',
    AGE = 'age'
}

const validators: any = {
    [CategoryFields.NAME]: (value: string) => {
        return value.length < 3 ? "minimum 3 characaters required" : null;
    },
    [CategoryFields.AGE]: (value: number) => {
        return value < 18 ? "Age is < 18" : null;
    },
    [CategoryFields.LANGUAGE]: (value: LangEnum) => {
        return value.length < 3 ? "minimum 3 characaters required" : null;
    }
}

interface CategoryCreateState {
    language: LangEnum,
    name: string,
    errors: {
        [key: string]: string
    }
}


class CategoryCreate extends React.PureComponent<any, CategoryCreateState> {
    constructor(props: any) {
        super(props);
        this.state = {
            language: LangEnum.DE,
            name: '',
            errors: {}
        };
        console.log(this.state)
        this.handleChange = this.handleChange.bind(this);
    }

    handleSubmit = (event: any) => {
        event.preventDefault();
        console.log(event)
    }

    handleChange = (event: any) => {
        event.preventDefault();
        const { name, value } = event.target;
        const formErrors = this.state.errors;
        const errorMessage = validators[name](value);

        if (errorMessage) {
            formErrors[name] = errorMessage;
        } else {
            delete formErrors[name];
        }

        const newState = {
            [name]: value,
            errors: formErrors
        }
        this.setState(newState as any);
    }

    render() {
        return (
            <div>
                <h1>Category Create</h1>

                <form onSubmit={this.handleSubmit} >
                    <select value={this.state.language} name={CategoryFields.LANGUAGE} onChange={this.handleChange}>
                        {createLangOptions()}
                    </select>


                    <input type='text' name={CategoryFields.NAME} onChange={this.handleChange} />
                    <div>
                        {this.state.errors[CategoryFields.NAME] ? this.state.errors[CategoryFields.NAME] : 'Kein Fehler!'}
                    </div>

                    <input type='number' name={CategoryFields.AGE} onChange={this.handleChange} />
                    <div>
                        {this.state.errors[CategoryFields.AGE] ? this.state.errors[CategoryFields.AGE] : 'Kein Fehler!'}
                    </div>

                    <button>Create</button>
                </form>


            </div>
        );
    }
}

export default CategoryCreate;