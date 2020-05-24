import React, { Suspense } from "react";
import { Router, Switch, Route, Redirect } from "react-router-dom";
import { createBrowserHistory } from 'history';
import { supportedLanguages } from "../../constants/appConstants";
import App from "../../App";

const history = createBrowserHistory();

function AppPrefix(props: any) {
    console.log(props)

    function getLangFromCookie(props: any): string {
        console.log(props)
        const cookie = props.cookies.get('lang');
        return 'en';
    }

    return (
        <div>
            <Router history={history}>
                <Switch >
                    <Route path={supportedLanguages} render={props => {
                        return (<Suspense fallback={null}>
                            <App {...props} />
                        </Suspense>)
                    }} />

                    <Route render={props => {
                        return (<Redirect to={{ pathname: `/en/` }} />)
                    }} />


                </Switch>
            </Router>
        </div>
    );
}

export default AppPrefix;