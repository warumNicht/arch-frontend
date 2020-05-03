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
            const currentUserRoles: string[] = UserService.getCurrentUserRoles();
            if (currentUserRoles.length === 0) {
                // not logged in so redirect to login page with the return url
                return <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
            }

            // check if route is restricted by role
            if (hasRole && currentUserRoles.indexOf(hasRole) === -1) {
                // role not authorised so redirect to home page
                return <Redirect to={{ pathname: '/' }} />
            }

            // authorised so return component
            return <Component {...props} />
        }} />
    }

    private renderFn = (renderProps: any) => {
        if (this.props.hasRole) {
            const { component: Component } = this.props; // JSX accepts only upprcase.
            if (!Component) {
                return null;
            }
            return <Component {...renderProps} />
        }

        return <Redirect to={this.props.hasRole} />;
    };

}