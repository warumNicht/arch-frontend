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
        let errorMessage= null;

        switch (name) {
            case "name":
                errorMessage =
                    value.length < 3 ? "minimum 3 characaters required" : null;
                break;
            case "language":
                errorMessage =
                    value.length > 2 ? "maximum 2 characaters required" : null;
                break;
            case "age":
                errorMessage =
                    value < 18 ? "Age is <18" : null;
                break;
            default:
                break;
        }
        if(errorMessage){
            formErrors[name] = errorMessage;
        }else{
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
                    <select value={this.state.language} name='language' onChange={this.handleChange}>
                        {createLangOptions()}
                    </select>


                    <input type='text' name='name' onChange={this.handleChange} />
                    <div>
                        {this.state.errors['name'] ? this.state.errors['name'] : 'Kein Fehler!'}
                    </div>

                    <input type='number' name='age' onChange={this.handleChange} />
                    <div>
                        {this.state.errors['age'] ? this.state.errors['age'] : 'Kein Fehler!'}
                    </div>

                    <button>Create</button>
                </form>


            </div>
        );
    }
}

export default CategoryCreate;