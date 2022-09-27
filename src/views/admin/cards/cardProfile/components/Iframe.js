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
        console.log('custom card', card);
    },[card]);
    return (
        <div>
            <div id="wrapper">
                <Flex position='relative' className='phone hide-scrollbar' style={{ height: '650px', width: '350px', overflow:'auto'}}>
                {/* <Flex className="phone view_3 hide-scrollbar" id="phone" style={{position:'relative', zoom: 1, width: 350, height: 650, overflow: 'auto' }}> */}
                    {/* <iframe className='iframe' src="https://poplme.co/7BRzvEfO" id="frame"  ></iframe> */}
                    {/* <ProfileView name={name} bio={bio} job={job} company={company} card={card} avatar={avatar} setavatar={setavatar} cover={cover} setcover={setcover} socials={socials} /> */}
                    {/* <Box style={{height:'auto', minHeight:'100%', width:'100%'}}>
                    </Box> */}
                    <Flex
                        minH='100%'
                        h='auto'
                        w='100%'
                        justifyContent='center'
                        direction='column'
                    >
                        <ProfileView card={card} socials={socials} hideFooter coverMinHeight='50%'/>
                    </Flex>
                </Flex>
            </div>
            <div id="controls">
            </div>
        </div>
    )
}

export default CustomIframe;