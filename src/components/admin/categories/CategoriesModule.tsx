import React from "react";
import { Switch, Route, Redirect, RouteComponentProps } from "react-router-dom";
import { getLangPrefix } from "../../../util/LangPrefixUtil";
import CategoryCreate from "./create/CategoryCreate";
import CategoriesList from "./list/CategoriesList";
import CategoryEdit from "./edit/CategoryEdit";


class CategoriesModule extends React.PureComponent<any> {

    render() {
        return (
            <div>
                <h1>CategoriesComponent</h1>
            
                <Switch>
                    <Route path={`${this.props.match.path}/create`} component={CategoryCreate} />
                    <Route path={`${this.props.match.path}/list`} component={CategoriesList} />
                    <Route exact path={`${this.props.match.path}/edit/:categoryId`} component={CategoryEdit} />
                    <Redirect to={{ pathname: `/${getLangPrefix(this.props.match.path)}/404` }} />
                </Switch>
            </div>
        );
    }
}

export default CategoriesModule;