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
    errors: {}
}


class CategoryCreate extends React.PureComponent<any, CategoryCreateState> {
    constructor(props: any) {
        super(props);
        this.state = {
            language: LangEnum.DE,
            name: '',
            errors: {
                language: '',
                name: '',
            }
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleSubmit = (event: any) => {
        event.preventDefault();
        console.log(event)
    }

    handleChange = (event: any) => {
        event.preventDefault();
        const { name, value } = event.target;

        const newState= {
            [name]: value,
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

                    <button>Create</button>
                </form>


            </div>
        );
    }
}

export default CategoryCreate;