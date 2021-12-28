import React from 'react'
import { Route, Redirect } from 'react-router-dom';
export { PrivateRoute };

function PrivateRoute({ component: Component, ...rest }) {
    return (
        <Route {...rest} render={props => {
            if (rest.user === "") {
                // not logged in so redirect to login page with the return url
                return <Redirect to={{ pathname: '/login', forward: props.match.url, state: { from: props.location } }} />
            }

            // authorized so return component
            return <Component {...props} />
        }} />
    );
}