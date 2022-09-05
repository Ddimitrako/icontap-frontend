import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";


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
            url: `http://127.0.0.1:8000/api/email/verify`,
            params: {
                expires:expires,
                signature:signature,
                id:id,
                hash:hash
            }
        }).then((response) => {
            console.log(response);
            localStorage.clear();
            window.location.href='/auth/sign-in';
        }).catch((err) => {
            console.log(err.response);
        }).finally(() => {
            setloading(false);
        })
    }
    
    useEffect(()=>{
        console.log(expires);
        postToApi();
    },[]);

    return <>asdf</>
}