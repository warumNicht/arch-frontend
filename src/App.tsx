import React from "react";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import Signup from './components/signup/signup';
import AvatarContainer from "./containers/AvatarContainer";
import LoginContainer from "./containers/LoginContainer";
import { Home } from "./components/home/home";
import { Dashboard } from "./components/dashboard/dashboard";
import { PrivateRoute } from "./shared/PrivateRoute";
import { UserRoles } from "./constants/appConstants";
import { Unauthorized } from "./components/unauthorized/Unauthorized";

function App() {
  return (
    <div>
      <AvatarContainer></AvatarContainer>  

        <Switch>
          <Route exact path="/" component={Home}/>
          <PrivateRoute path="/dashboard" hasRole={UserRoles.admin} component={Dashboard}/>
          <Route path="/login" component={LoginContainer} />
          <Route path="/register" component={Signup}/>
          <Route path="/unauthorized" component={Unauthorized}/>
        </Switch>
    </div>
  );
}

export default App;
