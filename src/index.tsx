import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

import { createStore } from "redux";
import { Provider } from "react-redux";
import mainReducer from './redux/reducers'

import setToken, { getToken } from './redux/actions/actions'
import { Router } from "react-router-dom";
import { createBrowserHistory } from 'history';
import { CookiesProvider } from 'react-cookie';

import './i18n/i18n'; //executes content


const history = createBrowserHistory();

const store = createStore(mainReducer);

console.log(store.getState())
// Every time the state changes, log it
// Note that subscribe() returns a function for unregistering the listener
const unsubscribe = store.subscribe(() => console.log(store.getState()))

// Dispatch some actions
store.dispatch(setToken('This is the token set in redux'))
console.log(store.getState().token)


ReactDOM.render(
  <React.StrictMode>
    <CookiesProvider>
      <Provider store={store}>
        <Router history={history}>
          <Suspense fallback={null}>
            <App />
          </Suspense>
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
