import { Alert, AlertDescription, AlertIcon, AlertTitle, ListItem, UnorderedList } from "@chakra-ui/react";
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
                rest.availableToAll || (auth != rest.isPublic) ? (
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

    if (isAuth() && token) {
        setAxiosErrorInterceptor();
        setAxiosAUthorizationHeader(token);
    }

    return null;

}

export function setAxiosAUthorizationHeader(token) {

    axios.interceptors.request.use(function (config) {
        config.headers.Authorization = `Bearer ${token}`;
        return config;
    });
}

export function setAxiosErrorInterceptor() {
    axios.interceptors.response.use(function (response) {
        return response;
    }, function (error) {
        if (error.response.status == 401) {
            window.location.href = '/admin/logout';
        }
        
        if (error.response.status == 403) {
            window.location.href = '/admin/logout';
        }

        return Promise.reject(error);
    }
    );
}

export const MeContext = React.createContext();

export function GetMeFromApi() {

    const [MeContextValue, setMeContextValue] = useContext(MeContext);

    useEffect(() => {
        
        if(localStorage.getItem('unverified')!= '1'){
            axios({
                method: 'get',
                url: `${hostName}/me`
            }).then((response) => {
                // console.log(response);
                localStorage.setItem('me', JSON.stringify(response.data.data));
                setMeContextValue(response.data.data);
            }).catch((err) => {
                console.log(err.response);
            })
        }else{
            localStorage.removeItem('unverified');
        }

    }, []);

    return <></>;

}

export function getMe() {
    return JSON?.parse(localStorage.getItem('me'));
}

export function hasRole(roleId) {
    return getMe()?.role?.id==roleId;
}

export const DisplayError=({errors})=>errors?.length>0?<UnorderedList style={{color:'red'}}>{errors.map((err, i)=><ListItem key={i}>{err}</ListItem>)}</UnorderedList>:<></>;


export const NeedsEmailVerification=()=>{
    return <Alert
    status='warning'
    variant='subtle'
    flexDirection='column'
    alignItems='center'
    justifyContent='center'
    textAlign='center'
    height='400px'

  >
    <AlertIcon boxSize='40px' mr={0} />
    <AlertTitle mt={4} mb={1} fontSize='lg'>
      Needs verification
    </AlertTitle>
    <AlertDescription maxWidth='sm'>
      Thanks for submitting your application. In order for your account to be active, your email needs to be verified. Please check your inbox and follow the provided instructions.
    </AlertDescription>
  </Alert>
};