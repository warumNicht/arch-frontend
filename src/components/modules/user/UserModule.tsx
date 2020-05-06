import React from "react";
import { Switch, Route } from "react-router-dom";
import LoginContainer from "../../../containers/LoginContainer";
import Signup from "../../signup/signup";

function UserModule(props: any) {
    return (

        <Switch>
            <Route path={`${props.match.url}/login`} component={LoginContainer} />
            <Route path={`${props.match.url}/register`} component={Signup} />
        </Switch>

    );
}

export default UserModule;