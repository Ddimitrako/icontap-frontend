import React, {useState} from 'react'
import {createPortal, render} from 'react-dom'
import {
    Image,
} from "@chakra-ui/react";
import { Flex, Grid, useColorModeValue } from "@chakra-ui/react";
import './CSS/Iframe.css';
import {useEffect} from 'react';

const CustomIframe = () => {
    return (

        <div>
            <div id="wrapper">
                <div className="phone view_1" id="phone_1" style={{width:400,height:650}}>
                    <iframe src="https://poplme.co/7BRzvEfO" id="frame_1"></iframe>
                </div>
            </div>
            <div id="controls">
            </div>
            <div id="linkBack"
                 style={{
                     position: "absolute",
                     right: 0,
                     pxbottom: 0,
                     backgroundPositionX: '#333',
                     margin: '0',
                     width: '60px',
                     padding: '5px'
                 }}><a
                href="http://www.f-rilling.com/projects/" target="_blank"
                style={{
                    fontSize: '14px',
                    textDecoration: "none",
                    color: '#fff',
                    padding: '0 0 0 5px',
                    fontFamily: "sans-serif"
                }}>My Site</a>
            </div>
        </div>

    )
}

export default CustomIframe;