/**/
import { Link } from 'react-router-dom';
import { MdBuild, MdCall, MdPreview } from "react-icons/md";
import { Stack, HStack, VStack, FormLabel, Input, InputGroup, InputLeftAddon, Heading } from '@chakra-ui/react';
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
import { useEffect } from 'react';

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

    const socialDummys=[
        {
            "id": 19,
            "name": "Linktree",
            "image": "contents/linktree.svg",
            "category_id": 2,
            "created_at": "2022-09-20T16:53:21.000000Z",
            "updated_at": "2022-09-20T16:53:21.000000Z",
            "category": {
                "id": 2,
                "name": "Social media",
                "created_at": "2022-09-20T16:53:20.000000Z",
                "updated_at": "2022-09-20T16:53:20.000000Z"
            },
            "imgUrl": "contents/linktree.svg",
            "title": "Linktree",
            "url": "fdas"
        },
        {
            "id": 31,
            "name": "Tiktok",
            "image": "contents/tiktok.svg",
            "category_id": 2,
            "created_at": "2022-09-20T16:53:21.000000Z",
            "updated_at": "2022-09-20T16:53:21.000000Z",
            "category": {
                "id": 2,
                "name": "Social media",
                "created_at": "2022-09-20T16:53:20.000000Z",
                "updated_at": "2022-09-20T16:53:20.000000Z"
            },
            "imgUrl": "contents/tiktok.svg",
            "title": "Tiktok",
            "url": "fdasds"
        },
        {
            "id": 30,
            "name": "Telegram",
            "image": "contents/telegram.svg",
            "category_id": 1,
            "created_at": "2022-09-20T16:53:21.000000Z",
            "updated_at": "2022-09-20T16:53:21.000000Z",
            "category": {
                "id": 1,
                "name": "Contact info",
                "created_at": "2022-09-20T16:53:20.000000Z",
                "updated_at": "2022-09-20T16:53:20.000000Z"
            },
            "imgUrl": "contents/telegram.svg",
            "title": "Telegram",
            "url": "fdasfsd"
        }
    ];

    useEffect(()=>{
        if(!socials?.length!=0){
            // setsocials(socialDummys);
        }
    },[socials]);

    useEffect(()=>{
        console.log('parent card', card);
    },[card]);

    const profileIcon=<i className="fa-solid fa-user" style={{marginRight:'5px'}}></i>;
    const qrIcon=<i className="fa-solid fa-qrcode" style={{marginRight:'5px'}}></i>;

    return (
        <Box pt={{ base: "180px", md: "80px", xl: "80px" }}>
            {/* Main Fields */}
            <Tabs>
                <TabList className='height-none' style={{border:'0', backgroundColor:'#f9f9f9'}}>
                    <Tab _focus={{ boxShadow: "none", }} className='tab-custom'>{profileIcon} Profile</Tab>
                    {card.code && <Tab _focus={{ boxShadow: "none", }} className='tab-custom'>{qrIcon} QR Code</Tab>}
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
                                    <Card className='edit-profile-container'>
                                        <EditProfile socials={socials} setsocials={setsocials} name={name} setname={setname} bio={bio} setbio={setbio} job={job} setjob={setjob} company={company} setcompany={setcompany} setCard={setCard} avatar={avatar} setavatar={setavatar} cover={cover} setcover={setcover}/>
                                    </Card>
                                </FormControl>
                            </Flex>
                            <Flex flexDirection='column' alignItems='center' pt='10px'>
                                <Heading color={'black'} size='sm'>Profile Live Preview</Heading>
                                {card && <CustomIframe socials={socials} card={card}/>}
                                <Stack direction='row' spacing={4}>
                                    <Button onClick={() => {
                                        window.open(`${frontAddress}/card/${card.code}`, "_blank");
                                    }} rightIcon={<MdPreview />} colorScheme='black' variant='outline'>
                                        View Profile
                                    </Button>
                                </Stack>
                            </Flex>
                        </Grid>
                    </TabPanel>
                    {card.code && <TabPanel style={{ textAlign: 'center' }}>
                        <Image style={{paddingTop:'50px', paddingRight:'20px', paddingLeft:'20px', paddingBottom:'100px', backgroundColor:'white', border:'none', borderRadius:'20px',boxShadow:'rgb(205 205 205) 10px 10px 10px' }} src={`${hostNameStorage}/${card?.qr_code}`} />
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
