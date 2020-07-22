import React, { FormEvent } from "react";
import api from '../../../../util/api';
import { csrfHeaderName, tokenAttributeName } from "../../../../constants/appConstants";

const config = {
    headers: {
        [csrfHeaderName]: localStorage.getItem(tokenAttributeName)
    }
};

interface CategoryEditState {
    localNames: {
        [key: string]: string
    }
}

class CategoryEdit extends React.PureComponent<any, CategoryEditState> {
    constructor(props: any) {
        super(props);
        this.state = {
            localNames: {}
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
                    localNames: res.data.localNames
                })
            })
            .catch((e: any) => {
                console.log(e)
            });
    }

    createLanguageInputs(localNames: {
        [key: string]: string
    }) {
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
                </div>
            })
        )
    }

    handleChange = (event: React.BaseSyntheticEvent) => {
        event.preventDefault();

        const { name, value } = event.target;
        this.setState({
            localNames:{
                ...this.state.localNames,
                [name]:value
            }
        })
        console.log(name, value)
    }

    handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();



        console.log(this.state)
    }

    render() {
        return (
            <div>
                <h1>Category Edit</h1>

                <form onSubmit={this.handleSubmit}>
                    {this.createLanguageInputs(this.state.localNames)}

                    <button >Edit</button>
                </form>

            </div>
        );
    }
}

export default CategoryEdit;