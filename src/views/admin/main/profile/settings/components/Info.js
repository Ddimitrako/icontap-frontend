// Chakra imports
import {
    Button,
    Flex,
    FormControl,
    SimpleGrid, Stack,
    Text,
    useColorModeValue,
} from "@chakra-ui/react";
import Card from "components/card/Card.js";
import InputField from "components/fields/InputField";
import TextField from "components/fields/TextField";
import React from "react";
import {catchError, getAuth} from "Helpers/Auth";
import {Axios} from "axios";
import axios from "axios";
import {useParams} from "react-router-dom";
import {useState, useEffect} from 'react';
import {Spinner} from '@chakra-ui/react'

export default function Settings() {

    var hostName = process.env.REACT_APP_HOSTNAME.toString()
    const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
    const textColorSecondary = "secondaryGray.600";
    const textColor = useColorModeValue("secondaryGray.900", "white");
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
    const [state, setState] = useState('--');
    const [zipCode, setzipCode] = useState('--');

    const firstNameChange = (event) => setFirstName(event.target.value)
    const lastNameChange = (event) => setLastName(event.target.value)
    const addressChange = (event) => setAddress(event.target.value)
    const cityChange = (event) => setCity(event.target.value)
    const stateChange = (event) => setState(event.target.value)
    const zipCodeChange = (event) => setzipCode(event.target.value)
    const professionChange = (event) => setProfession(event.target.value)
    const telephoneChange = (event) => setTelephone(event.target.value)

    const config = {
        headers: {Authorization: `Bearer ${getAuth()}`}

    };
    const bodyParameters = {
        key: "value"
    };
    useEffect(() => {
        getUserProfileData() //call at initialization
    }, []);


    function setNewUserProfileData() {
        //axios post new data
    }

    function getUserProfileData() {
        axios.get(
            hostName + '/api/me',
            bodyParameters,
            config
        ).then((response) => {
                console.log(response.data.data)
                setFirstName(response.data.data.name)
                setLastName(response.data.data.last_name)
                setEmail(response.data.data.email)
                setAccountType(response.data.data.role.name)
                setOpacity(1)
                setShowSpinner(false)
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
                        <Text fontSize='xl' color={textColorPrimary} fontWeight='bold'>
                            Personal Profile Info
                        </Text>
                        <Text fontSize='md' color={textColorSecondary}>
                            Here you can set your personal info
                        </Text>
                    </Flex>
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
                            read
                            mb='0px'
                            id='Company'
                            value={company}
                            label='Company'
                        />
                        <InputField
                            mb='0px'
                            id='Email'
                            value={email}
                            label='Email Address'
                        />
                        <InputField
                            mb='0px'
                            id=''
                            placeholder={profession}
                            label='Profession'
                            onChange={professionChange}
                        />
                        <InputField
                            mb='0px'
                            id=''
                            placeholder={telephone}
                            label='Telephone'
                            onChange={telephoneChange}
                        />
                    </SimpleGrid>

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
                                        placeholder={state}
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
                            variant='darkBrand'
                            fontSize='sm'
                            borderRadius='16px'
                            w={{base: "128px", md: "148px"}}
                            h='46px'
                            ms='auto'
                            onClick={() => {
                                setNewUserProfileData()
                            }}>
                            Save changes
                        </Button>
                    </Flex>
                </Card>
            </FormControl>
        </div>
    );
}
