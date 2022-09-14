import { catchError } from "Helpers/Auth";
import { getAuth } from "Helpers/Auth";
import React, { useEffect, useState } from "react";

var hostName = process.env.REACT_APP_HOSTNAME.toString()
export default function LogoutMid(props) {

    const [loading, setloading] = useState(false);

    const axios = require('axios').default;

    function postToApi() {
        // setloading(true);
        localStorage.clear();
        axios({
            method: 'put',
            url: hostName + `/me/logout`,
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