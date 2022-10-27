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
import { downloadImage } from 'Helpers/App';
import { copy2clip } from 'Helpers/App';

export default function Page() {
    const textColorPrimary = '#3A3A3A';
    const textColorSecondary = "secondaryGray.600";
    const textColor = '#3A3A3A';
    // Chakra Color Mode

    const [card, setCard] = useState({});

    const [avatar, setavatar] = useState({ url: '/static/media/img.jpg' });
    const [cover, setcover] = useState({ url: '/static/media/img.jpg' });

    const [name, setname] = useState('');
    const [bio, setbio] = useState('');
    const [job, setjob] = useState('');
    const [company, setcompany] = useState('');


    const socialDummys = [
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

    const [socials, setsocials] = useState([]);
    const [socialimgs, setsocialimgs] = useState({});

    // useEffect(()=>{
    //     console.log('parent socials', socials, socialimgs);
    // },[socials, socialimgs]);

    const profileIcon = <i className="fa-solid fa-user" style={{ marginRight: '5px' }}></i>;
    const qrIcon = <i className="fa-solid fa-qrcode" style={{ marginRight: '5px' }}></i>;

    return (
        <Box pt={{ base: "180px", md: "80px", xl: "80px" }}>
            {/* Main Fields */}
            <Tabs>
                <TabList className='height-none' style={{ border: '0', backgroundColor: '#f9f9f9' }}>
                    <Tab _focus={{ boxShadow: "none", }} className='tab-custom'>{profileIcon} Profile</Tab>
                    {card.code && <Tab _focus={{ boxShadow: "none", }} className='tab-custom'>{qrIcon} QR Code</Tab>}
                </TabList>
                <TabPanels
                    paddingTop={'30px'}
                >
                    <TabPanel
                        className='custom-tab-panel'
                    >
                        <Grid
                            mb='20px'
                            maxW='100%'
                            gridTemplateColumns={{
                                base: "1fr",
                                lg: "3fr 2fr",
                                // "2xl": "2fr 0.95fr",
                            }}
                            gap={{ base: "20px", xl: "200px" }}
                            display={{ base: "block", lg: "grid" }}>
                            <Flex flexDirection='column' gridArea='1 / 1 / 2 / 2'
                                className='tab-cols'
                            >
                                <FormControl>
                                    <Card className='edit-profile-container'>
                                        <EditProfile socialimgs={socialimgs} setsocialimgs={setsocialimgs} socials={socials} setsocials={setsocials} name={name} setname={setname} bio={bio} setbio={setbio} job={job} setjob={setjob} company={company} setcompany={setcompany} setCard={setCard} avatar={avatar} setavatar={setavatar} cover={cover} setcover={setcover} />
                                    </Card>
                                </FormControl>
                            </Flex>
                            <Flex flexDirection='column' alignItems='center' pt='10px'
                                className='tab-cols'
                            >
                                <Heading className='hide-under-959' color={'black'} size='sm'>Profile Live Preview</Heading>
                                {card && <CustomIframe socials={socials} card={card} />}
                                <Stack direction='row' spacing={4}>
                                    <Button onClick={() => {
                                        if (card.code != 'demo')
                                            window.open(`${frontAddress}/card/${card.code}`, "_blank");
                                    }} rightIcon={<MdPreview />} colorScheme='black' variant='outline'>
                                        View Profile
                                    </Button>
                                </Stack>
                            </Flex>
                        </Grid>
                    </TabPanel>
                    {card.code && <TabPanel style={{ textAlign: 'left' }}>
                        <Image style={{ paddingTop: '50px', paddingRight: '20px', paddingLeft: '20px', paddingBottom: '100px', backgroundColor: 'white', border: 'none', borderRadius: '20px', boxShadow: 'rgb(205 205 205) 10px 10px 10px' }} src={card?.qr_code != 'demo' ? `${hostNameStorage}/${card?.qr_code}` : `/static/media/demo-qr.jpg`} />
                        {/* <button className='Icontap-black-btn' style={{ marginTop: '10px', marginBottom: '20px' }} onClick={() => { downloadImage(card?.qr_code != 'demo' ? `${hostNameStorage}/${card?.qr_code}` : `/static/media/demo-qr.jpg`, 'icontap-qr') }}>Download QR Code</button> */}
                        <br />
                        <InputGroup>
                            <InputLeftAddon children='URL' />
                            <Input value={card.code != 'demo' ? `https://my.icontap.gr/card/${card.code}` : 'demo-url'} readOnly />
                        </InputGroup>
                        <button className='Icontap-white-btn' style={{ marginTop: '10px', marginBottom: '10px' }} onClick={(e) => { copy2clip(e.target, card.code != 'demo' ? `https://my.icontap.gr/card/${card.code}` : 'demo-url') }}>

                            <span className="tooltiptext">Url copied</span>
                            Copy URL
                        </button>
                    </TabPanel>}
                </TabPanels>
            </Tabs>

            {/* Delete Product */}
        </Box>
    );
}
