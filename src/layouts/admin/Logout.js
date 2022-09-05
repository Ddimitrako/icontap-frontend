import { catchError } from "Helpers/Auth";
import { getAuth } from "Helpers/Auth";
import React, { useEffect, useState } from "react";


export default function LogoutMid(props) {

    const [loading, setloading] = useState(false);

    const axios = require('axios').default;

    axios.interceptors.request.use(
        config => {
            config.headers.Authorization = `Bearer ${getAuth()}`;
            return config;
        }
    );

    function postToApi() {
        // setloading(true);
        localStorage.clear();
        axios({
            method: 'put',
            url: `http://127.0.0.1:8000/api/me/logout`,
        }).then((response) => {
            console.log(response);
        }).catch((err) => {
            console.log(err.response);
            catchError(err);
        }).finally(() => {
            setloading(false);
        });
 
        window.location.href = '/auth/sign-in';
 
    }

    useEffect(() => {
        postToApi();
    }, []);

    return <></>
}