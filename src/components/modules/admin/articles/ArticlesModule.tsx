import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { getLangPrefix } from "../../../../util/LangPrefixUtil";
import ArticleCreate from "./create/ArticleCreate";


class ArticlesModule extends React.PureComponent<any> {

    render() {
        return (
            <div>
                <h1>Articles Module</h1>
                <Switch>
                    <Route path={`${this.props.match.path}/create`} component={ArticleCreate} />

                    <Redirect to={{ pathname: `/${getLangPrefix(this.props.match.path)}/404` }} />
                </Switch>
            </div>
        );
    }
}

export default ArticlesModule;