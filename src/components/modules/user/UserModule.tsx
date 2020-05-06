import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import LoginContainer from "../../../containers/LoginContainer";
import Signup from "../../signup/signup";

function UserModule(props: any) {
    return (
        <Switch>
            <Route path={`${props.match.url}/login`} component={LoginContainer} />
            <Route path={`${props.match.url}/register`} component={Signup} />
            <Redirect to="/404"/>
        </Switch>
    );
}

export default UserModule;