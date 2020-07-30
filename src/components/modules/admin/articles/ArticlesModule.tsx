import React from "react";
import { Switch, Route, Redirect, Link } from "react-router-dom";
import { getLangPrefix } from "../../../../util/LangPrefixUtil";
import ArticleCreate from "./create/ArticleCreate";
import ArticleEdit from "./edit/ArticleEdit";
import ArticleAddLang from "./addLang/ArticleAddLang";
import ArticleEditLang from "./editLang/ArticleEditLang";
import ListAllArticles from "./listAll/ListAllArticles";


class ArticlesModule extends React.PureComponent<any> {

    render() {
        return (
            <div>
                <h1>Articles Module</h1>
                <Switch>
                    <Route path={`${this.props.match.path}/create`} component={ArticleCreate} />
                    <Route path={`${this.props.match.path}/listAll`} component={ListAllArticles} />
                    <Route exact path={`${this.props.match.path}/edit/:articleId`} component={ArticleEdit} />
                    <Route exact path={`${this.props.match.path}/edit/:articleId/:lang`} component={ArticleEditLang} />
                    <Route exact path={`${this.props.match.path}/addLang/:articleId`} component={ArticleAddLang} />

                    <Redirect to={{ pathname: `/${getLangPrefix(this.props.match.path)}/404` }} />
                </Switch>
            </div>
        );
    }
}

export default ArticlesModule;