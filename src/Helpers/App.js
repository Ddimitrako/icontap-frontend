import React from "react";

export const hostName=process.env.REACT_APP_HOSTNAME.toString();
let storageTemp=hostName.split('/');
storageTemp.pop();
storageTemp=storageTemp.join('/');
export const hostNameStorage=`${storageTemp}/storage`;