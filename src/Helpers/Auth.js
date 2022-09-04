import { Redirect, Route } from "react-router-dom";

export function logIn(token) {
    localStorage.setItem('token', token);
}

export function isAuth() {
    return localStorage.getItem('token')!=undefined&&localStorage.getItem('token')!=null;
}

export function PrivateRoute({ children, ...rest }) {
    let auth = isAuth();
    return (
      <Route
        {...rest}
        render={({ location }) =>
          (auth != rest.isPublic) ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: !rest.isPublic?"/auth/sign-in":"/",
                state: { from: location }
              }}
            />
          )
        }
      />
    );
  }