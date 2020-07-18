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


class CategoryCreate extends React.PureComponent<any> {

    handleSubmit = (event: any) => {
        event.preventDefault();
        console.log(event)
    }

    handleChange = (event: any) => {
        event.preventDefault();
        console.log(event)
    }

    render() {
        return (
            <div>
                <h1>Category Create</h1>

                <form onSubmit={this.handleSubmit}>
                    <select value={languagesArray[1]} onChange={this.handleChange}>
                        {createLangOptions()}
                    </select>
                </form>


            </div>
        );
    }
}

export default CategoryCreate;