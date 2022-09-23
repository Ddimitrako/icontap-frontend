/*!
  _   _  ___  ____  ___ ________  _   _   _   _ ___   ____  ____   ___  
 | | | |/ _ \|  _ \|_ _|__  / _ \| \ | | | | | |_ _| |  _ \|  _ \ / _ \ 
 | |_| | | | | |_) || |  / / | | |  \| | | | | || |  | |_) | |_) | | | |
 |  _  | |_| |  _ < | | / /| |_| | |\  | | |_| || |  |  __/|  _ <| |_| |
 |_| |_|\___/|_| \_\___/____\___/|_| \_|  \___/|___| |_|   |_| \_\\___/ 
                                                                                                                                                                                                                                                                                                                                       
=========================================================
* Horizon UI Dashboard PRO - v1.0.0
=========================================================

* Product Page: https://www.horizon-ui.com/pro/
* Copyright 2022 Horizon UI (https://www.horizon-ui.com/)

* Designed and Coded by Simmmple

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

// Chakra imports
import {Box, Flex, Select, SimpleGrid, Text, useColorModeValue} from "@chakra-ui/react";
// Assets
import banner from "assets/img/auth/banner.png";
import profile from "assets/img/avatars/memberIcon.png";
import React, {useState} from "react";
// Custom components
import Info from "views/admin/main/profile/settings/components/Info";
import Password from "views/admin/main/profile/settings/components/Password";
import Profile from "views/admin/main/profile/settings/components/Profile";
import Delete from "../../account/settings/components/Delete";
import {
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
} from '@chakra-ui/react'
import {useEffect} from "react";
export default function Settings() {
    const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
    const textColorSecondary = "secondaryGray.600";
    const [showAlert, setShowAlert] = useState(false)

    useEffect(() => {
        const timeId = setTimeout(() => {
            // After 3 seconds set the show value to false
            setShowAlert(false)
        }, 3000)

        return () => {
            clearTimeout(timeId)
        }
    }, [showAlert]);

    return (
        <Box pt={{base: "130px", md: "80px", xl: "80px"}}>
            {showAlert && <Alert status='success'>
                <AlertIcon/>
                Data uploaded to the server. Fire on!
            </Alert>}
            <SimpleGrid
                mb='20px'
                columns={{sm: 1, lg: 2}}
                spacing={{base: "20px", xl: "20px"}}>
                {/* Column Left */}
                <Flex direction='column'>
                    {/*<Profile name='Vlad Mihalache' avatar={profile} banner={banner} />*/}
                    <Info setShowAlert={setShowAlert}/>
                </Flex>
                {/* Column Right */}
                <Flex direction='column'>
                    <Password/>
                    {/*<Delete/>*/}
                </Flex>
            </SimpleGrid>
        </Box>
    );
}
