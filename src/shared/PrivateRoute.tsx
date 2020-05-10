import React from 'react';
import { Route, Redirect, RouteProps, RouteComponentProps } from 'react-router-dom';
import UserService from '../services/UserService'

interface PrivateRouteProps extends RouteProps {
    component: React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any>
    hasRole: string
}

export class PrivateRoute extends Route <PrivateRouteProps>{

    render() {
        const { component: Component, hasRole, ...rest }: PrivateRouteProps = this.props;
        return <Route {...rest} render={props => {

            // const currentUserRoles: string[] = UserService.getCurrentUserRoles();
            // if (currentUserRoles.length === 0) {
            //     // not logged in so redirect to login page with the return url
            //     return <Redirect to={{ pathname: '/users/login', state: { from: props.location } }} />
            // }

            // // check if route is restricted by role
            // if (hasRole && currentUserRoles.indexOf(hasRole) === -1) {
            //     // role not authorised so redirect to unauthorized page
            //     return <Redirect to={{ pathname: '/unauthorized' }} />
            // }

            // authorised so return component
            return <Component {...props} />
        }} />
    }

}