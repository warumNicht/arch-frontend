import React from "react";
import { LangEnum, csrfHeaderName } from "../../../../constants/appConstants";
import { languagesArray } from '../../../../constants/appConstants';
import ValidationMessages from '../../../../shared/ValidationMessages/ValidationMessages';
import api from '../../../../util/api';

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

interface ValidatorsByField {
    [key: string]: (value: any) => string[] | null,
    // [CategoryFields.AGE]: (value: number) => string[] | null,
    // [CategoryFields.LANGUAGE]: (value: LangEnum) => string[] | null,
}

const validators: ValidatorsByField = {
    [CategoryFields.NAME]: (value: string) => {
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
    [CategoryFields.AGE]: (value: number) => {
        return value < 18 ? ["Age is < 18"] : null;
    },
    [CategoryFields.LANGUAGE]: (value: LangEnum) => {
        return value.length > 2 ? ["maximum 2 characaters required"] : null;
    }
}

interface ErrorMessages {
    [key: string]: {
        isTouched: boolean,
        messages: string[] | null
    }
}

interface CategoryCreateState {
    language: LangEnum,
    name: string,
    age: number,
    errors: ErrorMessages
}


class CategoryCreate extends React.PureComponent<any, CategoryCreateState> {
    constructor(props: any) {
        super(props);
        this.state = {
            language: LangEnum.DE,
            name: '',
            age: 3,
            errors: {}
        };
        console.log(this.state)
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        this.setInitialErrors();
        console.log(this.state)
        console.log(this.state)
    }

    setInitialErrors() {
        let initialErrors: ErrorMessages = {};
        Object.entries(CategoryFields)
            .forEach(entry => {
                const currentErrrorMessage = validators[entry[1]](this.state[entry[1]])
                initialErrors[entry[1]] = {
                    isTouched: false,
                    messages: currentErrrorMessage
                }
            });
        this.setState({
            errors: initialErrors
        })
    }

    handleSubmit = (event: any) => {
        event.preventDefault();

        const config = {
            headers: {
                [csrfHeaderName]: localStorage.getItem('token')
            }
        };

        api
            .post(`/admin/category/create2`, { country: 'EN', name: 'Ajax' }, config)
            .then((res) => {
                console.log(res);
            })
            .catch((e: any) => {
                console.log(e)
            });

        console.log('submittted')
        console.log(event)
    }

    handleChange = (event: any) => {
        event.preventDefault();
        const { name, value } = event.target;
        const formErrors = this.state.errors;
        const errorMessages: string[] | null = validators[name](value);


        formErrors[name] = {
            isTouched: true,
            messages: errorMessages
        };

        let newState = {
            [name]: value,
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

    hasFieldErrors(fieldName: string): boolean {
        return this.state.errors[fieldName] && this.state.errors[fieldName].isTouched && !!this.state.errors[fieldName].messages;
    }

    render() {
        return (
            <div>
                <h1>Category Create</h1>

                <form onSubmit={this.handleSubmit} >
                    <select value={this.state.language} name={CategoryFields.LANGUAGE} onChange={this.handleChange}>
                        {createLangOptions()}
                    </select>


                    <input type='text' value={this.state.name} name={CategoryFields.NAME} onChange={this.handleChange} />
                    {this.hasFieldErrors(CategoryFields.NAME) ?
                        <ValidationMessages messages={this.state.errors[CategoryFields.NAME].messages} /> : 'Kein'}

                    <input type='number' value={this.state.age} name={CategoryFields.AGE} onChange={this.handleChange} />
                    {this.hasFieldErrors(CategoryFields.AGE) ?
                        <ValidationMessages messages={this.state.errors[CategoryFields.AGE].messages} /> : 'Kein'}

                    <button disabled={this.shouldDisableSubmit()}>Create</button>
                </form>


            </div>
        );
    }
}

export default CategoryCreate;