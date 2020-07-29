import React, { FormEvent } from "react";
import api from '../../../../../util/api';
import { csrfHeaderName, tokenAttributeName } from "../../../../../constants/appConstants";
import { ErrorMessages, ValidatorsByField, ErrorMessage } from "../../AdminInterfaces";
import ValidationMessages from "../../../../../shared/ValidationMessages/ValidationMessages";
import { CategoryFields } from "../create/CategoryCreate";
import { textFieldValidator } from "../../util/ValidationFunctions";

const config = {
    headers: {
        [csrfHeaderName]: localStorage.getItem(tokenAttributeName)
    }
};

const validators: ValidatorsByField = {
    [CategoryFields.NAME]: {
        validationFunction: textFieldValidator,
        conditions: {
            allowEmpty: true,
            min: 3,
            beginUppercase: true
        }
    }
}

interface LocalNames {
    [key: string]: string
}

interface CategoryEditState {
    localNames: LocalNames,
    errors: ErrorMessages
}

class CategoryEdit extends React.PureComponent<any, CategoryEditState> {
    constructor(props: any) {
        super(props);
        this.state = {
            localNames: {},
            errors: {}
        }
    }

    componentDidMount() {
        console.log('mounted')
        this.loadCategory();
    }

    loadCategory() {
        const categoryId = this.props.match.params.categoryId;
        api
            .get(`/admin/category/edit/${categoryId}`, config)
            .then((res) => {
                console.log(res.data);

                this.setState({
                    localNames: res.data.localNames,
                    errors: this.getInitialErrors(res.data.localNames)
                })
            })
            .catch((e: any) => {
                console.log(e)
            });
    }

    getInitialErrors(data: LocalNames): ErrorMessages {
        let initialErrors: ErrorMessages = {};
        const validator = validators[CategoryFields.NAME].validationFunction;
        const conditions = validators[CategoryFields.NAME].conditions;

        Object.entries(data)
            .forEach(entry => {
                const currentErrrorMessage = validator(entry[1], conditions);
                initialErrors[entry[0]] = {
                    isTouched: false,
                    messages: currentErrrorMessage
                }
            });

        initialErrors['wholeForm'] = {
            isTouched: false,
            messages: this.getWholeFormErrors(data)
        }
        return initialErrors;
    }

    getWholeFormErrors(localNames: LocalNames): string[] | null {
        const countryCount: number = Object.entries(localNames).length;

        const emptyCountriesCount: number = Object.entries(localNames)
            .reduce((count: number, entry: any) => {
                return !entry[1] ? ++count : count;
            }, 0);

        return countryCount === emptyCountriesCount ? ['All counties cannot be empty!'] : null;
    }

    createLanguageInputs(localNames: LocalNames) {
        return (
            Object.entries(localNames).map((entry: any) => {
                return <div key={entry[0]}>
                    <label htmlFor={entry[0]}>
                        {entry[0]}
                        <input
                            type='text'
                            value={this.state.localNames[entry[0]]}
                            id={entry[0]}
                            name={entry[0]}
                            onChange={this.handleChange}>
                        </input>
                    </label>
                    <ValidationMessages validationErrors={this.state.errors[entry[0]]} />
                </div>
            })
        )
    }

    handleChange = (event: React.BaseSyntheticEvent) => {
        event.preventDefault();
        console.log(this.state)

        const { name, value } = event.target;
        const validator = validators[CategoryFields.NAME].validationFunction;
        const conditions = validators[CategoryFields.NAME].conditions;

        const changedFieldErrors: ErrorMessage = {
            isTouched: true,
            messages: validator(value, conditions),
        }

        const newLocalNames = {
            ...this.state.localNames,
            [name]: value
        };

        this.setState({
            localNames: newLocalNames,
            errors: {
                ...this.state.errors,
                [name]: changedFieldErrors,
                ['wholeForm']: {
                    isTouched: true,
                    messages: this.getWholeFormErrors(newLocalNames)
                }
            }
        });
    }

    shouldDisableSubmit(): boolean {
        const errorsTouchedCount: number = Object.entries(this.state.errors)
            .filter(entry => entry[1].isTouched && entry[1].messages)
            .length;
        const isFormTouched: boolean = !!Object.entries(this.state.errors).find(entry => entry[1].isTouched);
        if (!isFormTouched) {
            return true;
        }
        return errorsTouchedCount > 0;
    }

    handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const categoryId = this.props.match.params.categoryId;

        api
            .put(`/admin/category/edit/${categoryId}`, { localNames: this.state.localNames }, config)
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
                <h1>Category Edit</h1>

                <form onSubmit={this.handleSubmit}>
                    {this.createLanguageInputs(this.state.localNames)}

                    <ValidationMessages validationErrors={this.state.errors['wholeForm']} />
                    <button disabled={this.shouldDisableSubmit()}>Edit</button>
                </form>

            </div>
        );
    }
}

export default CategoryEdit;