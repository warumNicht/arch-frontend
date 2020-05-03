import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import UserService from '../services/UserService'

export const PrivateRoute = ({ component: Component, hasRole, ...rest } : any) => (
    <Route {...rest} render={props => {
        const currentUserRoles: string[] = UserService.getCurrentUserRoles();
        if (currentUserRoles.length===0) {
            // not logged in so redirect to login page with the return url
            return <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
        }

        // check if route is restricted by role
        if (hasRole && currentUserRoles.indexOf(hasRole)===-1) {
            // role not authorised so redirect to home page
            return <Redirect to={{ pathname: '/'}} />
        }

        // authorised so return component
        return <Component {...props} />
    }} />
)