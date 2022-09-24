import React, {useState} from 'react'
import {createPortal, render} from 'react-dom'
import {
    Box,
    Image,
} from "@chakra-ui/react";
import { Flex, Grid, useColorModeValue } from "@chakra-ui/react";
import './CSS/Iframe.css';
import {useEffect} from 'react';
import ProfileView from './ProfileView';
import { startOfDay } from '@fullcalendar/react';

const CustomIframe = ({card, avatar, setavatar, cover, setcover, name, bio, job, company, socials}) => {
    return (
        <div>
            <div id="wrapper">
                <div className="phone view_3 hide-scrollbar" id="phone" style={{zoom: 1,width:350,height:650, overflow:'auto'}}>
                    {/* <iframe className='iframe' src="https://poplme.co/7BRzvEfO" id="frame"  ></iframe> */}
                    {/* <ProfileView name={name} bio={bio} job={job} company={company} card={card} avatar={avatar} setavatar={setavatar} cover={cover} setcover={setcover} socials={socials} /> */}
                    <Box style={{height:'auto', minHeight:'100%', width:'100%'}}>
                        <ProfileView card={card} socials={socials} />
                    </Box>
                
                </div>
            </div>
            <div id="controls">
            </div>
        </div>
    )
}

export default CustomIframe;