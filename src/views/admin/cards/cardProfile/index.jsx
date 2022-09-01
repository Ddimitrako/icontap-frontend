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

import React from "react";
import iphone from "assets/img/cards/iphone.png";
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
                            <Flex direction='column' mb='40px' ms='10px'>
                                <Text fontSize='xl' color={textColorPrimary} fontWeight='bold'>
                                    Card Info
                                </Text>
                            </Flex>
                            <SimpleGrid
                                columns={{sm: 1, md: 2}}
                                spacing={{base: "20px", xl: "20px"}}>

                                <InputField
                                    mb='25px'
                                    id='last_name'
                                    label='Full Name'
                                    placeholder='John kehas'
                                />
                            </SimpleGrid>
                            <TextField
                                id='about'
                                label='Bio'
                                h='100px'
                                placeholder='Tell something about yourself in 150 characters!'
                            />
                            <Notifications
                                used={25.6}
                                total={50}
                            />
                            <Button
                                variant='brand'
                                minW='183px'
                                fontSize='sm'
                                fontWeight='500'
                                ms='auto'>
                                Save changes
                            </Button>

                        </Card>
                    </FormControl>
                </Flex>
                <Flex flexDirection='column' gridArea='1 / 2 / 2 / 3' pt='10px'>
                    {/*<Image src={iphone} w='60%' h='70%' borderRadius='10px'/>*/}
                    <CustomIframe title='A custom made iframe'>

      </CustomIframe>

                </Flex>
            </Grid>


            {/* Delete Product */}
        </Box>
    );
}
