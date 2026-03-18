import React from "react";
import { useEffect } from "react";

const envString = (value, fallback = "") => String(value ?? fallback);

export const frontAddress = envString(process.env.REACT_APP_FRONTADDRESS);
export const hostName = envString(process.env.REACT_APP_HOSTNAME);
export const showBuyButton = (envString(process.env.REACT_APP_SHOW_BUYYOURPERFORMANCE, "false") === 'true');
export const showInsights = (envString(process.env.REACT_APP_SHOW_INSIGHTS, "false") === 'true');
export const imageDirectory = envString(process.env.REACT_APP_USE_IMAGEDIRECTORY);
let storageTemp = hostName.split('/');
storageTemp.pop();
storageTemp = storageTemp.join('/');
export const hostNameStorage = `${storageTemp}/storage`;
export function redirectRouter(url, state, history) {
    // console.log(url, state);
    history.push({
        pathname: url,
        state: state
    });
}

export function downloadImage(url, name){
    // console.log(url, name);
    fetch(url)
      .then(resp => resp.blob())
      .then(blob => {
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.style.display = 'none';
          a.href = url;
          // the filename you want
          a.download = name;
          document.body.appendChild(a);
          a.click();
          window.URL.revokeObjectURL(url);
      })
      .catch(() => alert('An error sorry'));
}

export function copy2clip(element, text) {
    element.classList.add("tooltip");
    navigator.clipboard.writeText(text);
    setTimeout(() => {
        element.classList.remove("tooltip");
    }, 700);
}
