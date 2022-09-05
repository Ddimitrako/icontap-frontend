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
import {Link} from 'react-router-dom';
import {MdBuild, MdCall, MdPreview} from "react-icons/md";
import {Stack, HStack, VStack} from '@chakra-ui/react';
import React from "react";
import CustomIframe from "./components/Iframe";
// Chakra imports
import {
    Box,
    Flex,
    Grid,
    Text,
    useColorModeValue,
    SimpleGrid, Button, FormControl, Image,
} from "@chakra-ui/react";

// Custom components
import Banner from "views/admin/cards/cardProfile/components/Banner";
import TableLastOffer from "views/admin/cards/cardProfile/components/TableLastOffer";
import Auction from "views/admin/cards/cardProfile/components/Auction";
import Description from "views/admin/cards/cardProfile/components/Description";
import NFT from "components/card/NFT";
import Card from "components/card/Card.js";

import tableDataLastOffer from "views/admin/cards/cardProfile/variables/tableDataLastOffer.json";
import {tableColumnsLastOffer} from "views/admin/cards/cardProfile/variables/tableColumnsLastOffer";
import Notifications from "../../main/profile/overview/components/Notifications";
import InputField from "../../../../components/fields/InputField";
import TextField from "../../../../components/fields/TextField";
import EditProfile from 'views/admin/main/account/billing/components/EditCardModal/EditProfile';

export default function Page() {
    const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
    const textColorSecondary = "secondaryGray.600";
    const textColor = useColorModeValue("secondaryGray.900", "white");
    // Chakra Color Mode


    return (
        <Box pt={{base: "180px", md: "80px", xl: "80px"}}>
            {/* Main Fields */}
            <Grid
                mb='20px'
                maxW='100%'
                gridTemplateColumns={{
                    base: "1fr",
                    lg: "1fr 1fr",
                    "2xl": "1fr 0.95fr",
                }}
                gap={{base: "20px", xl: "20px"}}
                display={{base: "block", lg: "grid"}}>
                <Flex flexDirection='column' gridArea='1 / 1 / 2 / 2'>

                    <FormControl>
                        <Card>
                            <EditProfile />
                        </Card>
                    </FormControl>
                </Flex>
                <Flex flexDirection='column' alignItems='center' pt='10px'>
                    <CustomIframe/>
                    <Stack direction='row' spacing={4}>
                        <Button onClick={() => {
                            window.open("https://poplme.co/7BRzvEfO", "_blank");
                        }} rightIcon={<MdPreview/>} colorScheme='blue' variant='outline'>
                            View Profile
                        </Button>

                    </Stack>
                </Flex>
            </Grid>


            {/* Delete Product */}
        </Box>
    );
}
