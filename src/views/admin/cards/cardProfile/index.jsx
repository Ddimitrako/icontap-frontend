import { MdPreview } from "react-icons/md";
import { Stack, Input, InputGroup, InputLeftAddon, Heading } from '@chakra-ui/react';
import React from "react";
import CustomIframe from "./components/Iframe";
// Chakra imports
import {
    Box,
    Flex,
    Grid,
    Button, FormControl, Image, Text,
} from "@chakra-ui/react";
import Card from "components/card/Card.js";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import EditProfile from 'views/admin/main/account/billing/components/EditCardModal/EditProfile';
import { useState } from 'react';
import { hostNameStorage } from 'Helpers/App';
import { frontAddress } from 'Helpers/App';
import { copy2clip } from 'Helpers/App';

export default function Page() {
    const textColorPrimary = '#3A3A3A';

    const [card, setCard] = useState({});

    const [avatar, setavatar] = useState({ url: '/static/media/profile.svg' });
    const [cover, setcover] = useState({ url: '/static/media/cover.svg' });
    const [background, setbackground] = useState({ url: '' });

    const [name, setname] = useState('');
    const [bio, setbio] = useState('');
    const [job, setjob] = useState('');
    const [company, setcompany] = useState('');
    const [layoutKey, setlayoutKey] = useState('default');

    const [socials, setsocials] = useState([]);
    const [socialimgs, setsocialimgs] = useState({});

    const profileIcon = <i className="fa-solid fa-user" style={{ marginRight: '5px' }}></i>;
    const qrIcon = <i className="fa-solid fa-qrcode" style={{ marginRight: '5px' }}></i>;
    const showQrTab = Boolean(card.code);
    const hasQrImage = card?.qr_code && card?.qr_code !== 'demo';

    return (
        <Box pt={{ base: "180px", md: "80px", xl: "80px" }}>
            {/* Main Fields */}
            <Tabs>
                <TabList className='height-none' style={{ border: '0', backgroundColor: '#f9f9f9' }}>
                    <Tab _focus={{ boxShadow: "none", }} className='tab-custom'>{profileIcon} Profile</Tab>
                    {showQrTab && <Tab _focus={{ boxShadow: "none", }} className='tab-custom'>{qrIcon} QR Code</Tab>}
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
                            gap={{ base: "20px", xl: "20px" }}
                            display={{ base: "block", lg: "grid" }}>
                            <Flex flexDirection='column' gridArea='1 / 1 / 2 / 2'
                                className='tab-cols'
                            >
                                <FormControl>
                                    <Card className='edit-profile-container zoomed'>
                                        <EditProfile socialimgs={socialimgs} setsocialimgs={setsocialimgs} socials={socials} setsocials={setsocials} name={name} setname={setname} bio={bio} setbio={setbio} job={job} setjob={setjob} company={company} setcompany={setcompany} layoutKey={layoutKey} setlayoutKey={setlayoutKey} setCard={setCard} avatar={avatar} setavatar={setavatar} cover={cover} setcover={setcover} background={background} setbackground={setbackground} />
                                    </Card>
                                </FormControl>
                            </Flex>
                            <Flex flexDirection='column' alignItems='center' pt='10px'
                                className='tab-cols'
                            >
                                <Heading className='hide-under-959' color={'black'} size='sm'>Live Preview</Heading>
                                {card && <CustomIframe socials={socials} card={card} />}
                                <Stack direction='row' spacing={4}>
                                    <Button onClick={() => {
                                        if (card.code !== 'demo')
                                            window.open(`${frontAddress}/card/${card.code}`, "_blank");
                                    }} rightIcon={<MdPreview />} colorScheme='black' variant='outline' className={'view-profile-btn'}>
                                        View Profile
                                    </Button>
                                </Stack>
                            </Flex>
                        </Grid>
                    </TabPanel>
                    {showQrTab && <TabPanel style={{ textAlign: 'left' }}>
                        {card?.qr_code ? (
                            <Image style={{ paddingTop: '50px', paddingRight: '20px', paddingLeft: '20px', paddingBottom: '100px', backgroundColor: 'white', border: 'none', borderRadius: '20px', boxShadow: 'rgb(205 205 205) 10px 10px 10px' }} src={hasQrImage ? `${hostNameStorage}/${card?.qr_code}` : `/static/media/demo-qr.jpg`} />
                        ) : (
                            <Box style={{ paddingTop: '50px', paddingRight: '20px', paddingLeft: '20px', paddingBottom: '50px', backgroundColor: 'white', border: 'none', borderRadius: '20px', boxShadow: 'rgb(205 205 205) 10px 10px 10px' }}>
                                <Text color={textColorPrimary}>QR code is not available for this card yet.</Text>
                            </Box>
                        )}
                        {/* <button className='Performance-black-btn' style={{ marginTop: '10px', marginBottom: '20px' }} onClick={() => { downloadImage(card?.qr_code != 'demo' ? `${hostNameStorage}/${card?.qr_code}` : `/static/media/demo-qr.jpg`, 'performance-qr') }}>Download QR Code</button> */}
                        <br />
                        <InputGroup>
                            <InputLeftAddon children='URL' />
                            <Input value={card.code !== 'demo' ? `${frontAddress}/card/${card.code}` : 'demo-url'} readOnly />
                        </InputGroup>
                        <button className='Performance-white-btn' style={{ marginTop: '10px', marginBottom: '10px' }} onClick={(e) => { copy2clip(e.target, card.code !== 'demo' ? `${frontAddress}/card/${card.code}` : 'demo-url') }}>

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
