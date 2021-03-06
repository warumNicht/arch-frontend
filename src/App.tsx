import React from "react";
import { Switch, Route, Redirect, Link } from "react-router-dom";
import "./App.css";
import AvatarContainer from "./containers/AvatarContainer";
import NotFoundPage from "./components/not-found/NotFoundPage";
import Home from "./components/home/home";
import Dashboard from "./components/dashboard/dashboard";
import { PrivateRoute } from "./shared/PrivateRoute";
import { UserRoles } from "./constants/appConstants";
import { Unauthorized } from "./components/unauthorized/Unauthorized";
import AdminModule from "./components/modules/admin/AdminModule";
import UserModule from "./components/modules/user/UserModule";
import { useTranslation } from 'react-i18next';
import { withCookies } from 'react-cookie';
import { getLangCookie, createCookieOptions, getLangPrefix } from './util/LangPrefixUtil';

function App(props: any) {
  const { t, i18n } = useTranslation();
  const currentLangCookie = getLangCookie(props);
  const currentUrlLangPrefix = props.match.path.substring(1);

  if (!currentLangCookie) {
    //set cookie
    props.cookies.set('lang', currentUrlLangPrefix, createCookieOptions());
    i18n.changeLanguage(currentUrlLangPrefix);
  }
  if (currentLangCookie && currentLangCookie !== currentUrlLangPrefix) {
    props.cookies.set('lang', currentUrlLangPrefix, createCookieOptions());
    i18n.changeLanguage(currentUrlLangPrefix);
    return (<Redirect to={{ pathname: `/${currentUrlLangPrefix}/` }} />)
  }
  return (
    <div>
      <div>
        <Link to={`/en/admin/articles/edit/1`}>Article: 1</Link>
        <Link to={`/en/admin/articles/edit/2`}>Article: 2</Link>
        <Link to={`/en/admin/articles/listAll`}>Articles All</Link>
      </div>
      <div>
        <p>{t('welcome', 'Hello there')}</p>
      </div>
      <AvatarContainer {...props}></AvatarContainer>
      <Switch>
        <Route exact path={`${props.match.path}/`} component={Home} />
        <PrivateRoute path={`${props.match.path}/admin`} hasRole={UserRoles.ADMIN} component={AdminModule} />
        <PrivateRoute path={`${props.match.path}/dashboard`} hasRole={UserRoles.USER} component={Dashboard} />
        <Route path={`${props.match.path}/users`} component={UserModule} />
        <Route path={`${props.match.path}/unauthorized`} component={Unauthorized} />
        <Route path={`${props.match.path}/404`} component={NotFoundPage} />
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  );
}

export default withCookies(App);
