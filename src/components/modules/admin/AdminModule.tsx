import React from "react";
import { Switch, Route, Redirect, RouteComponentProps } from "react-router-dom";
import { withTranslation, Trans, WithTranslation } from 'react-i18next';
import CategoriesModule from "./categories/CategoriesModule";
import ProjectsModule from "./projects/ProjectsModule";
import { getLangPrefix } from "../../../util/LangPrefixUtil";

class AdminModule extends React.PureComponent<WithTranslation & RouteComponentProps> {

    render() {
        return (
            <div>
                <h1>ADMIN pages!!!</h1>
                <Trans i18nKey="navbar:content.text">
                    Welcome at <strong>our place</strong>.
                </Trans>

                <Switch>
                    <Route path={`${this.props.match.path}/category`} component={CategoriesModule} />
                    <Route path={`${this.props.match.path}/projects`} component={ProjectsModule} />
                    <Redirect to={{ pathname: `/${getLangPrefix(this.props.match.path)}/404` }} />
                </Switch>
            </div>
        );
    }
}

export default withTranslation(['translation', 'navbar'])(AdminModule);