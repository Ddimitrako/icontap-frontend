import { Redirect, Route } from "react-router-dom";

export function logIn(token) {
    localStorage.setItem('token', token);
}

export function isAuth() {
    return localStorage.getItem('token') != undefined && localStorage.getItem('token') != null;
}

export function getAuth() {
    return localStorage.getItem('token');
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
                            pathname: !rest.isPublic ? "/auth/sign-in" : "/",
                            state: { from: location }
                        }}
                    />
                )
            }
        />
    );
}

export function catchError(error) {

    if (error.response.status == 401) {
        window.location.href = '/admin/logout';
    }

    if (error.response.status == 403) {
        window.location.href = '/';
    }

}