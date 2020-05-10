import React from "react";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import Signup from './components/signup/signup';
import AvatarContainer from "./containers/AvatarContainer";
import LoginContainer from "./containers/LoginContainer";
import NotFoundPage from "./components/not-found/NotFoundPage";
import Home  from "./components/home/home";
import Welcome from "./components/dashboard/dashboard";
import { PrivateRoute } from "./shared/PrivateRoute";
import { UserRoles } from "./constants/appConstants";
import { Unauthorized } from "./components/unauthorized/Unauthorized";
import AdminComponent from "./components/admin/AdminComponent";
import UserModule from "./components/modules/user/UserModule";
import { useTranslation } from 'react-i18next';


function App() {
  const { t } = useTranslation();
  return (
    <div>
      <div>
        <p>{t('welcome', 'Hello there')}</p>
      </div>
      <AvatarContainer></AvatarContainer>
      <Switch>
        <Route exact path="/" component={Home} />
        <PrivateRoute path="/admin" hasRole={UserRoles.admin} component={AdminComponent} />
        <PrivateRoute path="/dashboard" hasRole={UserRoles.user} component={Welcome} />
        <Route path="/users" component={UserModule} />
        <Route path="/unauthorized" component={Unauthorized} />
        <Route path="/404" component={NotFoundPage} />
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  );
}

export default App;
