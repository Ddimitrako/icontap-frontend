import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";

var hostName = process.env.REACT_APP_HOSTNAME.toString()
export default function VerifyEmail(props) {

    const [loading, setloading]=useState(false);


    const location=useLocation();
    let params= location.search;
    params=new URLSearchParams(params);
    const expires=params.get("expires");
    const signature=params.get("signature");
    const id=params.get("id");
    const hash=params.get("hash");
  
    const axios = require('axios').default;

    function postToApi() {
        // setloading(true);
        axios({
            method: 'get',
            url: hostName+`/email/verify`,
            params: {
                expires:expires,
                signature:signature,
                id:id,
                hash:hash
            }
        }).then((response) => {
            // console.log(response);
            localStorage.setItem('email_verified', 1);
            window.location.href='/auth/sign-in';
        }).catch((err) => {
            // console.log(err.response);
        }).finally(() => {
            setloading(false);
        })
    }
    
    useEffect(()=>{
        // console.log(expires);
        postToApi();
    },[]);

    return <>asdf</>
}