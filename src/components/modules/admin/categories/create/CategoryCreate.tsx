import React, { FormEvent } from "react";
import { LangEnum, csrfHeaderName, defaultLang, tokenAttributeName } from "../../../../../constants/appConstants";
import { languagesArray } from '../../../../../constants/appConstants';
import ValidationMessages from '../../../../../shared/ValidationMessages/ValidationMessages';
import api from '../../../../../util/api';
import { ErrorMessages, ValidatorsByField } from "../../AdminInterfaces";
import { textFieldValidator } from "../../util/ValidationFunctions";

const createLangOptions = () => {
    return (
        languagesArray.map((lang: string) => {
            return <option key={lang} value={lang}>{lang}</option>
        })
    )
}

export enum CategoryFields {
    COUNTRY = 'country',
    NAME = 'name',
}

const validators: ValidatorsByField = {
    [CategoryFields.NAME]: {
        validationFunction: textFieldValidator,
        conditions: {
            allowEmpty: false,
            min: 3,
            beginUppercase: true
        }
    },
    [CategoryFields.COUNTRY]: {
        validationFunction: textFieldValidator,
        conditions: {
            allowEmpty: false,
            min: 2
        }
    }
}

interface CategoryCreateState {
    category: {
        country: LangEnum,
        name: string
    }
    errors: ErrorMessages
}

class CategoryCreate extends React.PureComponent<any, CategoryCreateState> {
    constructor(props: any) {
        super(props);
        this.state = {
            category: {
                country: defaultLang,
                name: ''
            },
            errors: {}
        };
        console.log(this.state)
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        this.setInitialErrors();
    }

    setInitialErrors() {
        let initialErrors: ErrorMessages = {};
        Object.entries(CategoryFields)
            .forEach(entry => {
                const validator = validators[entry[1]].validationFunction;
                const conditions = validators[entry[1]].conditions;
                const currentErrrorMessage = validator(this.state.category[entry[1]], conditions);
                initialErrors[entry[1]] = {
                    isTouched: false,
                    messages: currentErrrorMessage
                }
            });
        this.setState({
            errors: initialErrors
        })
    }

    handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const config = {
            headers: {
                [csrfHeaderName]: localStorage.getItem(tokenAttributeName)
            }
        };

        api
            .post(`/admin/category/create`, this.state.category, config)
            .then((res) => {
                console.log(res.data);
            })
            .catch((e: any) => {
                console.log(e)
            });

        console.log('submittted')
    }

    handleChange = (event: React.BaseSyntheticEvent) => {
        event.preventDefault();

        const { name, value } = event.target;
        const formErrors = this.state.errors;
        const validator = validators[name].validationFunction;
        const conditions = validators[name].conditions;
        const errorMessages: string[] | null = validator(value, conditions);

        formErrors[name] = {
            isTouched: true,
            messages: errorMessages
        };

        let newState = {
            category: {
                ...this.state.category,
                [name]: value,
            },
            errors: formErrors
        }
        this.setState(newState as any);
    }

    shouldDisableSubmit(): boolean {
        const res = Object.entries(this.state.errors).find(entry => entry[1].messages);
        console.log(res)
        const b: boolean = !!res;
        console.log(b)
        return b;
    }

    // hasFieldErrors(fieldName: string): boolean {
    //     return this.state.errors[fieldName] && this.state.errors[fieldName].isTouched && !!this.state.errors[fieldName].messages;
    // }

    render() {
        return (
            <div>
                <h1>Category Create</h1>

                <form onSubmit={this.handleSubmit} >
                    <select value={this.state.category.country} name={CategoryFields.COUNTRY} onChange={this.handleChange}>
                        {createLangOptions()}
                    </select>


                    <input type='text' value={this.state.category.name} name={CategoryFields.NAME} onChange={this.handleChange} />

                    <ValidationMessages validationErrors={this.state.errors[CategoryFields.NAME]} />

                    <button disabled={this.shouldDisableSubmit()}>Create</button>
                </form>


            </div>
        );
    }
}

export default CategoryCreate;