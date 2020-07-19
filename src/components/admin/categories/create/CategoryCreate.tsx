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
        return value.length > 2 ? "maximum 2 characaters required" : null;
    }
}

interface CategoryCreateState {
    isFormPristine: boolean,
    language: LangEnum,
    name: string,
    age: number,
    errors: {
        [key: string]: {
            isTouched: boolean,
            message: string
        }
    }
}


class CategoryCreate extends React.PureComponent<any, CategoryCreateState> {
    constructor(props: any) {
        super(props);
        this.state = {
            isFormPristine: true,
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
        let initialErrors: any = {};
        Object.entries(CategoryFields)
            .forEach(entry => {
                const currentErrrorMessage = validators[entry[1]](this.state[entry[1]])
                initialErrors[entry[1]] = {
                    isTouched: false,
                    message: currentErrrorMessage
                }
            });
        this.setState({
            errors: initialErrors
        })
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


        formErrors[name] = {
            isTouched: true,
            message: errorMessage
        };


        let newState: any = {
            [name]: value,
            errors: formErrors
        }
        if (this.state.isFormPristine) {
            newState.isFormPristine = false
        }
        this.setState(newState as any);
    }

    shouldDisableSubmit(): boolean {
        const res = !!Object.entries(this.state.errors).find(entry => entry[1].message);
        console.log(res)
        const b: boolean = !!res;
        console.log(b)
        return b;
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
                    <div>
                        {this.state.errors[CategoryFields.NAME] && this.state.errors[CategoryFields.NAME].isTouched ? this.state.errors[CategoryFields.NAME].message : 'Kein Fehler!'}
                    </div>

                    <input type='number' value={this.state.age} name={CategoryFields.AGE} onChange={this.handleChange} />
                    <div>
                        {this.state.errors[CategoryFields.AGE] && this.state.errors[CategoryFields.AGE].isTouched ? this.state.errors[CategoryFields.AGE].message : 'Kein Fehler!'}
                    </div>

                    <button disabled={this.shouldDisableSubmit()}>Create</button>
                </form>


            </div>
        );
    }
}

export default CategoryCreate;