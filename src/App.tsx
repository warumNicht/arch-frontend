import React from "react";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import Signup from './components/signup/signup';
import ProfileContainer from "./containers/ProfileContainer";
import LoginContainer from "./containers/LoginContainer";
import { Home } from "./components/home/home";
import { Dashboard } from "./components/dashboard/dashboard";
import { PrivateRoute } from "./shared/PrivateRoute";

function App() {
  return (
    <div>
      <ProfileContainer></ProfileContainer>  

        <Switch>
          <Route exact path="/" component={Home}/>
          <PrivateRoute path="/dashboard" hasRole={'ROLE_ADMIN'} component={Dashboard}/>
          <Route path="/login" component={LoginContainer} />
          <Route path="/register" component={Signup}/>
        </Switch>
    </div>
  );
}

export default App;
