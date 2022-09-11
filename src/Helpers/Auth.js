import axios from "axios";
import React from "react";
import { createContext } from "react";
import { useContext } from "react";
import { useEffect } from "react";
import { Redirect, Route } from "react-router-dom";
import { hostName } from "./App";

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

export function SetupAxios() {
    let token = getAuth();

    if (isAuth() && token)
        setAxiosAUthorizationHeader(token);

    return null;

}

export function setAxiosAUthorizationHeader(token) {
    
    console.log(token);
    axios.interceptors.request.use(function (config) {
        console.log('INTERCEPT', token);
        config.headers.Authorization = `Bearer ${token}`;
        return config;
    });
}

export const MeContext = React.createContext();

export function GetMeFromApi() {

    const [MeContextValue, setMeContextValue]=useContext(MeContext);
    
    useEffect(()=>{
        axios({
            method:'get',
            url:`${hostName}/me`
        }).then((response)=>{
            console.log(response);
            setMeContextValue(response.data.data);
        }).catch((err)=>{
            console.log(err.response);
        })
    },[]);

    return <></>;
}

export function getMe() {
    return JSON?.parse(localStorage.getItem('me'));
}
