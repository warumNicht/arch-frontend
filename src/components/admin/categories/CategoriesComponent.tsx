import React from "react";
import { Switch, Route, Redirect, RouteComponentProps } from "react-router-dom";
import { getLangPrefix } from "../../../util/LangPrefixUtil";
import CategoryCreate from "./create/CategoryCreate";


class CategoriesComponent extends React.PureComponent<any> {

    render() {
        return (
            <div>
                <h1>CategoriesComponent</h1>
            
                <Switch>
                    <Route path={`${this.props.match.path}/create`} component={CategoryCreate} />
                    <Redirect to={{ pathname: `/${getLangPrefix(this.props.match.path)}/404` }} />
                </Switch>
            </div>
        );
    }
}

export default CategoriesComponent;