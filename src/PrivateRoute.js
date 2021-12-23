import React from 'react';
import { Route, Redirect } from 'react-router-dom'

export function PrivateRoute({ children, ...rest }) {
    const logged = {
        isLoggedIn: !!localStorage.getItem('isLogged')
    };
  return (
    <Route
      {...rest}
      render={() =>
        logged.isLoggedIn? (
            children
        ) : (
            <Redirect
              to={{
                pathname: "/signin",
              }}
            />
          )
      }
    />
  );
}