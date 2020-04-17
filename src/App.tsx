import React from "react";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import Login from "./components/login/login";
import Signup from './components/signup/signup';

function App() {
  return (
    <div>
      <Router>
        <Switch>
          
          <Route path="/login" component={Login} />
          <Route path="/" component={Signup}/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
