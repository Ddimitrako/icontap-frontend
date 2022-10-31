import React, { useState } from 'react'
import { createPortal, render } from 'react-dom'
import {
    Box,
    Image,
} from "@chakra-ui/react";
import { Flex, Grid, useColorModeValue } from "@chakra-ui/react";
import './CSS/Iframe.css';
import { useEffect } from 'react';
import ProfileView from './ProfileView';
import { startOfDay } from '@fullcalendar/react';

const CustomIframe = ({ card, avatar, setavatar, cover, setcover, name, bio, job, company, socials }) => {
    useEffect(()=>{
        // console.log('custom card', card);
    },[card]);
    return (
        <div className='hide-under-959'>
            <div id="wrapper">
                <Flex className="phone view_3 hide-scrollbar" id="phone" style={{position:'relative', zoom: 0.85, width: 350, height: 650, overflow: 'auto' }}>
                    <ProfileView hideFooter name={name} bio={bio} job={job} company={company} card={card} avatar={avatar} setavatar={setavatar} cover={cover} setcover={setcover} socials={socials} />
                </Flex>
            </div>
            <div id="controls">
            </div>
        </div>
    )
}

export default CustomIframe;