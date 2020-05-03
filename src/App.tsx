import React from "react";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import Signup from './components/signup/signup';
import ProfileContainer from "./containers/ProfileContainer";
import LoginContainer from "./containers/LoginContainer";

function App() {
  return (
    <div>
      <ProfileContainer></ProfileContainer>  
      <Router>
        <Switch>
          
          <Route path="/login" component={LoginContainer} />
          <Route path="/" component={Signup}/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
