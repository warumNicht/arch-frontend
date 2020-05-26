import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

import { createStore } from "redux";
import { Provider } from "react-redux";
import mainReducer from './redux/reducers'

import setToken, { getToken, setCurrentUser } from './redux/actions/actions'
import { Router, Switch, Route, Redirect } from "react-router-dom";
import { createBrowserHistory } from 'history';
import { CookiesProvider } from 'react-cookie';

import './i18n/i18n'; //executes content
import { supportedLanguages } from './constants/appConstants'
import PrefixRedirect from "./shared/PrefixRedirect";
import UserService from './services/UserService'

import store from './redux/store';


const history = createBrowserHistory();

// const history = createBrowserHistory({ basename: '/app' });

// const store = createStore(mainReducer);

// Every time the state changes, log it
// Note that subscribe() returns a function for unregistering the listener
// const unsubscribe = store.subscribe(() => console.log(store.getState()))

// Dispatch some actions
store.dispatch(setCurrentUser(UserService.getPrincipal()))
store.dispatch(setToken('This is the token set in redux'))

console.log(store.getState())


ReactDOM.render(
  <React.StrictMode>
    <CookiesProvider>
      <Provider store={store}>
        <Router history={history}>
          <Switch>

            <Route path={supportedLanguages} render={props => {
              return (<Suspense fallback={null}>
                <App {...props} />
              </Suspense>)
            }} />

            <Route render={props => {
              return (<PrefixRedirect {...props} />)
            }} />

          </Switch>
        </Router>
      </Provider>
    </CookiesProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
