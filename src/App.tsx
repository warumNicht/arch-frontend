import React from "react";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import AvatarContainer from "./containers/AvatarContainer";
import NotFoundPage from "./components/not-found/NotFoundPage";
import Home  from "./components/home/home";
import Dashboard from "./components/dashboard/dashboard";
import { PrivateRoute } from "./shared/PrivateRoute";
import { UserRoles } from "./constants/appConstants";
import { Unauthorized } from "./components/unauthorized/Unauthorized";
import AdminComponent from "./components/admin/AdminComponent";
import UserModule from "./components/modules/user/UserModule";
import { useTranslation } from 'react-i18next';
import { withCookies } from 'react-cookie';


function App(props: any) {
  const { t } = useTranslation();
  console.log(props.cookies)
  console.log(props.match.path)
  return (
    <div>
      <div>
        <p>{t('welcome', 'Hello there')}</p>
      </div>
      <AvatarContainer {...props}></AvatarContainer>
      <Switch>
        <Route exact path={`${props.match.path}/`} component={Home} />
        <PrivateRoute path={`${props.match.path}/admin`} hasRole={UserRoles.admin} component={AdminComponent} />
        <PrivateRoute path={`${props.match.path}/dashboard`} hasRole={UserRoles.user} component={Dashboard} />
        <Route path={`${props.match.path}/users`} component={UserModule} />
        <Route path={`${props.match.path}/unauthorized`} component={Unauthorized} />
        <Route path={`${props.match.path}/404`} component={NotFoundPage} />
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  );
}

export default withCookies(App);
