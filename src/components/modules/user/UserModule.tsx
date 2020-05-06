import React from "react";
import { Switch, Route } from "react-router-dom";
import LoginContainer from "../../../containers/LoginContainer";
import Signup from "../../signup/signup";

function UserModule() {
    return (

        <Switch>
            <Route path="/users/login" component={LoginContainer} />
            <Route path="/users/register" component={Signup} />
        </Switch>

    );
}

export default UserModule;