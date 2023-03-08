// Chakra imports
import {
    Button,
    Flex,
    FormControl,
    SimpleGrid, Stack,
    Text,
} from "@chakra-ui/react";
import Card from "components/card/Card.js";
import InputField from "components/fields/InputField";
import React, {useContext} from "react";
import { getAuth, MeContext} from "Helpers/Auth";
import axios from "axios";
import { useState, useEffect } from 'react';
import { Spinner } from '@chakra-ui/react'

import { getMe } from "Helpers/Auth";

export default function Settings({setShowAlert}) {
    var hostName = process.env.REACT_APP_HOSTNAME.toString()
    const [MeContextValue, setMeContextValue] = useContext(MeContext);

    const textColorPrimary = '#3A3A3A';
    const textColorSecondary = "secondaryGray.600";
    const textColor = '#3A3A3A';
    const [showSpinner, setShowSpinner] = React.useState(true);

    const [opacity, setOpacity] = useState(0.1)
    const [firstName, setFirstName] = useState('eg. Esthera');
    const [lastName, setLastName] = useState('eg. Peterson');
    const [accountType, setAccountType] = useState('User');
    const [email, setEmail] = useState('--');
    const [company, setCompany] = useState('--');
    const [profession, setProfession] = useState('--');
    const [telephone, setTelephone] = useState('--');
    const [address, setAddress] = useState('--');
    const [city, setCity] = useState('--');
    const [stateLocation, setStateLocation] = useState('--');
    const [zipCode, setzipCode] = useState('--');

    const firstNameChange = (event) => setFirstName(event.target.value)
    const lastNameChange = (event) => setLastName(event.target.value)
    const addressChange = (event) => setAddress(event.target.value)
    const cityChange = (event) => setCity(event.target.value)
    const stateChange = (event) => setStateLocation(event.target.value)
    const zipCodeChange = (event) => setzipCode(event.target.value)
    const professionChange = (event) => setProfession(event.target.value)
    const telephoneChange = (event) => setTelephone(event.target.value)

    useEffect(() => {
        try {
            // console.log(getMe())
            setFirstName(getMe().name)
            setLastName(getMe().last_name)
            setProfession(getMe().data.profession)
            setCity(getMe().data.town)
            setTelephone(getMe().data.telephone)
            setzipCode(getMe().data.zip_code)
            setStateLocation(getMe().data.state)
            setAddress(getMe().data.address)
            setEmail(getMe().email)
            setAccountType(getMe().role.code)
            setCompany(getMe().companies[0].name)
        } catch (e) {
            // console.log('Error')
        }

        setOpacity(1)
        setShowSpinner(false)
    }, []);

    const config = {
        headers: {Authorization: `Bearer ${getAuth()}`}
    };
    const bodyParameters = {
        "name": firstName,
        "last_name": lastName,
        "telephone": telephone,
        "address": address,
        "town": city,
        "state": stateLocation,
        "zip_code": zipCode,
        "profession": profession
    };

    function setNewUserProfileData() {
        axios.put(
            hostName + '/me',
            bodyParameters,
            config
        ).then((response) => {
                if (response.status == 200) {
                    axios({
                        method: 'get',
                        url: `${hostName}/me`
                    }).then((response) => {
                        localStorage.setItem('me', JSON.stringify(response.data.data));
                        setMeContextValue(response.data.data);
                    }).catch((err) => {
                        // console.log(err.response);
                    })
                    setShowAlert(true)
                }
            }
        ).catch(console.log);
    }

    return (
        <div> {showSpinner ? <Spinner thickness='4px'
                                      speed='0.65s'
                                      emptyColor='gray.200'
                                      color='blue.500'
                                      size='xl'
                                      flex='1'

        /> : null}
            <FormControl id='formControl' style={{opacity: opacity}}>
                <Card mb='20px' pb='50px'>
                    <Flex direction='column' mb='40px' ms='10px'>
                        <Text
                            mt='25px'
                            mb='36px'
                            fontSize='2xl'
                            ms='24px'
                            fontWeight='700'> Profile
                        </Text>
                        <Text fontSize='md' color={textColorSecondary}>
                            Here you can setup your personal info
                        </Text>
                    </Flex>
                    <hr/>
                    <Flex align='center' mx='auto' px='15px'>
                        <Text
                            me='4px'
                            color={textColorSecondary}
                            fontSize='sm'
                            fontWeight='400'
                            lineHeight='100%'>
                            Account type:
                        </Text>
                        <Text
                            id='user_type'
                            w='unset'
                            variant='transparent'
                            display='flex'
                            textColor={textColorPrimary}
                            color={textColorPrimary}
                            alignItems='center'>{accountType}
                        </Text>
                    </Flex>
                    <hr/>
                    <br/>
                    <SimpleGrid columns={{base: "1", md: "2"}} gap='20px'>
                        <InputField
                            mb='0px'
                            id='firstName'
                            placeholder={firstName}
                            label='First Name'
                            onChange={firstNameChange}
                        />
                        <InputField
                            mb='0px'
                            id='lastName'
                            placeholder={lastName}
                            label='Last Name'
                            onChange={lastNameChange}
                        />
                        <InputField
                            readOnly
                            mb='0px'
                            id='Company'
                            value={company}
                            label='Company'
                        />
                        <InputField
                            readOnly
                            mb='0px'
                            id='Email'
                            value={email}
                            label='Email Address'
                        />
                        <InputField
                            mb='0px'
                            id='profession'
                            placeholder={profession}
                            label='Profession'
                            onChange={professionChange}
                        />
                        <InputField
                            mb='0px'
                            id='telephone'
                            placeholder={telephone}
                            label='Telephone'
                            onChange={telephoneChange}
                        />
                    </SimpleGrid>
                    <br/>
                    <Text color={textColor} fontSize='2xl' fontWeight='700' mb='20px'>
                        Address
                    </Text>
                    <Flex direction='column' w='100%'>
                        <Stack direction='column' spacing='20px' mb='20px'>
                            <InputField
                                mb='0px'
                                id='add1'
                                placeholder={address}
                                label='Address Line'
                                onChange={addressChange}
                            />

                            <SimpleGrid columns={{base: "1", md: "2"}} gap='20px'>
                                <InputField
                                    mb='0px'
                                    id='city'
                                    placeholder={city}
                                    label='City'
                                    onChange={cityChange}
                                />
                                <SimpleGrid columns={{base: "1", md: "2"}} gap='20px'>
                                    <InputField
                                        mb='0px'
                                        id='add2'
                                        placeholder={stateLocation}
                                        label='State'
                                        onChange={stateChange}
                                    />
                                    <InputField
                                        mb='0px'
                                        id='zip'
                                        placeholder={zipCode}
                                        label='ZIP'
                                        onChange={zipCodeChange}
                                    />
                                </SimpleGrid>
                            </SimpleGrid>
                        </Stack>
                    </Flex>
                    <Flex justify='space-between' mt='24px'>
                        <Button
                            // variant='darkBrand'
                            className="btn-custom-dark-background"
                            fontSize='sm'
                            borderRadius='16px'
                            w={{base: "128px", md: "148px"}}
                            h='46px'
                            ms='auto'
                            onClick={() => {
                                setNewUserProfileData()
                            }}>
                            💾 Save
                        </Button>
                    </Flex>
                </Card>
            </FormControl>
        </div>
    );
}
