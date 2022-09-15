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
import { Link } from 'react-router-dom';
import { MdBuild, MdCall, MdPreview } from "react-icons/md";
import { Stack, HStack, VStack, FormLabel, Input, InputGroup, InputLeftAddon } from '@chakra-ui/react';
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
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import tableDataLastOffer from "views/admin/cards/cardProfile/variables/tableDataLastOffer.json";
import { tableColumnsLastOffer } from "views/admin/cards/cardProfile/variables/tableColumnsLastOffer";
import Notifications from "../../main/profile/overview/components/Notifications";
import InputField from "../../../../components/fields/InputField";
import TextField from "../../../../components/fields/TextField";
import EditProfile from 'views/admin/main/account/billing/components/EditCardModal/EditProfile';
import { useState } from 'react';
import { hostNameStorage } from 'Helpers/App';
import { CustomEditBox } from 'views/admin/main/account/billing/components/EditCardModal/EditCardModal';
import { frontAddress } from 'Helpers/App';

export default function Page() {
    const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
    const textColorSecondary = "secondaryGray.600";
    const textColor = useColorModeValue("secondaryGray.900", "white");
    // Chakra Color Mode

    const [card, setCard] = useState({});
    
    const [avatar, setavatar] = useState({url:'/static/media/img.jpg'});
    const [cover, setcover] = useState({url:'/static/media/img.jpg'});
    
    const [name, setname] = useState('');
    const [bio, setbio] = useState('');
    const [job, setjob] = useState('');
    const [company, setcompany] = useState('');

    const [socials, setsocials] = useState([]);

    return (
        <Box pt={{ base: "180px", md: "80px", xl: "80px" }}>
            {/* Main Fields */}
            <Tabs>
                <TabList>
                    <Tab>Profile</Tab>
                    {card.code && <Tab>QR Code</Tab>}
                </TabList>
                <TabPanels>
                    <TabPanel>
                        <Grid
                            mb='20px'
                            maxW='100%'
                            gridTemplateColumns={{
                                base: "1fr",
                                lg: "1fr 1fr",
                                "2xl": "1fr 0.95fr",
                            }}
                            gap={{ base: "20px", xl: "20px" }}
                            display={{ base: "block", lg: "grid" }}>
                            <Flex flexDirection='column' gridArea='1 / 1 / 2 / 2'>
                                <FormControl>
                                    <Card>
                                        <EditProfile socials={socials} setsocials={setsocials} name={name} setname={setname} bio={bio} setbio={setbio} job={job} setjob={setjob} company={company} setcompany={setcompany} setCard={setCard} avatar={avatar} setavatar={setavatar} cover={cover} setcover={setcover}/>
                                    </Card>
                                </FormControl>
                            </Flex>
                            <Flex flexDirection='column' alignItems='center' pt='10px'>
                                <CustomIframe socials={socials} setsocials={setsocials} name={name} bio={bio} job={job} company={company} card={card} avatar={avatar} setavatar={setavatar} cover={cover} setcover={setcover}/>
                                <Stack direction='row' spacing={4}>
                                    <Button onClick={() => {
                                        window.open(`${frontAddress}/card/${card.code}`, "_blank");
                                    }} rightIcon={<MdPreview />} colorScheme='blue' variant='outline'>
                                        View Profile
                                    </Button>
                                </Stack>
                            </Flex>
                        </Grid>
                    </TabPanel>
                    {card.code && <TabPanel style={{ textAlign: 'center' }}>
                        <Image style={{ margin: '0 auto' }} src={`${hostNameStorage}/${card?.qr_code}`} />
                        <br />
                        <InputGroup>
                            <InputLeftAddon children='URL' />
                            <Input value={`https://my.icontap.gr/card/${card.code}`} readOnly />
                        </InputGroup>
                    </TabPanel>}
                </TabPanels>
            </Tabs>

            {/* Delete Product */}
        </Box>
    );
}
