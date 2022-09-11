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
export default function Settings() {
    var hostName = process.env.REACT_APP_HOSTNAME.toString()
    // Chakra Color Mode
    const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
    const textColorSecondary = "secondaryGray.600";
    const textColor = useColorModeValue("secondaryGray.900", "white");


    const config = {
        headers: {Authorization: `Bearer ${getAuth()}`}

    };
    const { token } = useParams();
    const bodyParameters = {
        key: "value"
    };

    axios.get(
        hostName + '/me',
        bodyParameters,
        config
    ).then((response) => {
        console.log(response)
        }
               ).catch(console.log);

    return (
        <FormControl>
            <Card mb='20px' pb='50px'>
                <Flex direction='column' mb='40px' ms='10px'>
                    <Text fontSize='xl' color={textColorPrimary} fontWeight='bold'>
                        Personal Profile Info
                    </Text>
                    <Text fontSize='md' color={textColorSecondary}>
                        Here you can set your personal info
                    </Text>
                </Flex>
                <SimpleGrid columns={{base: "1", md: "2"}} gap='20px'>
                    <InputField
                        mb='0px'
                        id='first'
                        placeholder='eg. Esthera'
                        label='First Name'
                    />
                    <InputField
                        mb='0px'
                        id='last'
                        placeholder='eg. Peterson'
                        label='Last Name'
                    />
                    <InputField
                        mb='0px'
                        id='Company'
                        placeholder='eg. Simmmple'
                        label='Company'
                    />
                    <InputField
                        mb='0px'
                        id='Email'
                        placeholder='eg. hello@simmmple.com'
                        label='Email Address'
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
                            placeholder='eg. Main Street 203'
                            label='Address Line 1'
                        />
                        <InputField
                            mb='0px'
                            id='add2'
                            placeholder='eg. Apartment, Floor'
                            label='Address Line 2'
                        />
                        <SimpleGrid columns={{base: "1", md: "2"}} gap='20px'>
                            <InputField
                                mb='0px'
                                id='city'
                                placeholder='eg. Miami'
                                label='City'
                            />
                            <SimpleGrid columns={{base: "1", md: "2"}} gap='20px'>
                                <InputField
                                    mb='0px'
                                    id='add2'
                                    placeholder='Florida'
                                    label='State'
                                />
                                <InputField
                                    mb='0px'
                                    id='zip'
                                    placeholder='eg. Apartment, Floor'
                                    label='ZIP'
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
                        }}>
                        Save changes
                    </Button>
                </Flex>
            </Card>
        </FormControl>
    );
}
