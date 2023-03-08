import {Box, Flex, Select, SimpleGrid, Text, useColorModeValue} from "@chakra-ui/react";
import React, {useState} from "react";
// Custom components
import Info from "views/admin/main/profile/settings/components/Info";
import Password from "views/admin/main/profile/settings/components/Password";
import {
    Alert,
    AlertIcon,
} from '@chakra-ui/react'
import {useEffect} from "react";
export default function Settings() {
    const textColorPrimary = '#3A3A3A';
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
                Data is saved already!
            </Alert>}
            <SimpleGrid
                mb='20px'
                columns={{sm: 1, lg: 2}}
                spacing={{base: "20px", xl: "20px"}}>
                {/* Column Left */}
                <Flex direction='column'>
                    {/*<Profile name='Vlad Mihalache' avatar={profile} banner={banner} />*/}
                    <Accordion />
                </Flex>
            </SimpleGrid>
        </Box>
    );
}
