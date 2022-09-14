import React, {useState} from 'react'
import {createPortal, render} from 'react-dom'
import {
    Image,
} from "@chakra-ui/react";
import { Flex, Grid, useColorModeValue } from "@chakra-ui/react";
import './CSS/Iframe.css';
import {useEffect} from 'react';
import ProfileView from './ProfileView';

const CustomIframe = ({card, avatar, setavatar, cover, setcover}) => {
    return (

        <div>
            <div id="wrapper">
                <div className="phone view_3" id="phone" style={{zoom: 1,width:350,height:650, overflowY:'auto'}}>
                    {/* <iframe className='iframe' src="https://poplme.co/7BRzvEfO" id="frame"  ></iframe> */}
                    <ProfileView card={card} avatar={avatar} setavatar={setavatar} cover={cover} setcover={setcover}/>
                </div>
            </div>
            <div id="controls">
            </div>
        </div>

    )
}

export default CustomIframe;