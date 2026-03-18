import { Button, Flex, FormControl, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, PinInput, PinInputField, Text } from "@chakra-ui/react";
import { useColorModeValue } from "@chakra-ui/system";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { hostName } from "./App";
import {
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
  } from '@chakra-ui/react'

export const demoCard = {
    "id": 0,
    "code": "demo",
    "title": "Demo Card",
    "is_active": 1,
    "is_personal": 1,
    "activated_at": "2022-09-30 19:27:06",
    "activated_by": "demo@performance.gr",
    "owner": 1,
    "views": 288,
    "qr_code": "demo",
    "created_at": "2022-09-30T16:27:06.000000Z",
    "updated_at": "2022-10-07T04:49:32.000000Z",
    "profile": {
        "id": 0,
        "card_id": 0,
        "title": "John's Card #1",
        "name": "John Doe",
        "bio": "My bio from John Doe",
        "job_title": null,
        "company": null,
        "vcard": "demo",
        "created_at": "2022-09-30T16:27:06.000000Z",
        "updated_at": "2022-10-07T08:47:25.000000Z"
    },
    "content": [
        {
            "id": 442,
            "card_id": 0,
            "content_id": 1,
            "image": "contents/call.svg",
            "link": "asdf",
            "title": "Call",
            "description": null,
            "is_active": 1,
            "order": 0,
            "created_at": "2022-10-07T08:47:09.000000Z",
            "updated_at": null,
            "content": {
                "id": 1,
                "name": "Call",
                "base_url": "tel:01233456789"
            }
        }
    ],
    "images": null
}

export function ActivateCardModal(props) {

    const activateModalDisclosure = props.activateModalDisclosure;
    const isActOpen = activateModalDisclosure.isOpen;
    const onActOpen = activateModalDisclosure.onOpen;
    const onActClose = activateModalDisclosure.onClose;

    useEffect(()=>{
        seterror(null);
        setactivationCode(null);
        setcardCode(null);
    },[onActClose]);

    const [pin1, setpin1] = useState(0);
    const [pin2, setpin2] = useState(0);
    const [pin3, setpin3] = useState(0);
    const [pin4, setpin4] = useState(0);
    const [pin5, setpin5] = useState(0);
    const [pin6, setpin6] = useState(0);
    const [activationCode, setactivationCode] = useState();
    const [cardCode, setcardCode] = useState('');

    const textColor = useColorModeValue("navy.700", "white");
    const textColorDetails = useColorModeValue("navy.700", "secondaryGray.600");
    const textColorBrand = useColorModeValue("brand.500", "white");
    const borderColor = useColorModeValue("secondaryGray.400", "whiteAlpha.100");

    const initialRef = React.useRef(null);
    const finalRef = React.useRef(null);

    const [error, seterror]=useState();

    const errors={
        "WRONG_CODE":"Invalid Code.",
        "ACTIVATED_CARD":"Card activated already."
    };


    useEffect(() => {
        setactivationCode(`${pin1}${pin2}${pin3}${pin4}${pin5}${pin6}`);
    }, [pin1, pin2, pin3, pin4, pin5, pin6]);

    function activateCard() {
        props.setloading(true);
        seterror(null);
        axios({
            method: 'put',
            url: `${hostName}/card/${cardCode}/activate`,
            data: {
                activation_code: activationCode
            }
        }).then((response) => {
            // console.log(response);
            props?.getcards();
            onActClose();
        }).catch((err) => {
            // console.log(err.response);
            if(err.response.status==404){
                seterror('Card not found');
            }else{
                seterror(errors[err.response.data.message]);
            }
        }).finally(()=>{
            props.setloading(false);
        });
    }

    return <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isActOpen}
        onClose={onActClose}
    >
        <ModalOverlay />
        <ModalContent>
            <ModalHeader>Activate your Card</ModalHeader>
            <ModalCloseButton />

            <ModalBody>
                <Text>Card ID:</Text>
                <FormControl>
                    <Flex justify='left'>
                        <Input size='md' htmlSize={48} width='auto' value={cardCode} onChange={(e)=>{setcardCode(e.target.value)}} />
                    </Flex>
                </FormControl>
                <br/>
                <hr></hr>
                <br/>
                <Text> Please add your card activation code here.</Text>
                <Flex
                    zIndex='2'
                    direction='column'
                    w={{ base: "100%", md: "395px" }}
                    maxW='100%'
                    background='transparent'
                    borderRadius='15px'
                    mx={{ base: "auto", lg: "unset" }}
                    me='auto'
                    mb={{ base: "20px", md: "auto" }}>

                    <FormControl>
                        <Flex justify='center'>
                            <PinInput mx='auto' otp>
                                <PinInputField
                                    onChange={(e) => setpin1(e.target.value)}
                                    value={pin1}
                                    fontSize='36px'
                                    color={textColor}
                                    borderRadius='16px'
                                    borderColor={borderColor}
                                    h={{ base: "63px", md: "95px" }}
                                    w={{ base: "63px", md: "95px" }}
                                    me='10px'
                                />
                                <PinInputField
                                    onChange={(e) => setpin2(e.target.value)}
                                    value={pin2}
                                    fontSize='36px'
                                    color={textColor}
                                    borderRadius='16px'
                                    borderColor={borderColor}
                                    h={{ base: "63px", md: "95px" }}
                                    w={{ base: "63px", md: "95px" }}
                                    me='10px'
                                />
                                <PinInputField
                                    onChange={(e) => setpin3(e.target.value)}
                                    value={pin3}
                                    fontSize='36px'
                                    color={textColor}
                                    borderRadius='16px'
                                    borderColor={borderColor}
                                    h={{ base: "63px", md: "95px" }}
                                    w={{ base: "63px", md: "95px" }}
                                    me='10px'
                                />
                                <PinInputField
                                    onChange={(e) => setpin4(e.target.value)}
                                    value={pin4}
                                    fontSize='36px'
                                    color={textColor}
                                    borderRadius='16px'
                                    borderColor={borderColor}
                                    h={{ base: "63px", md: "95px" }}
                                    w={{ base: "63px", md: "95px" }}
                                    me='10px'
                                />
                                <PinInputField
                                    onChange={(e) => setpin5(e.target.value)}
                                    value={pin5}
                                    fontSize='36px'
                                    color={textColor}
                                    borderRadius='16px'
                                    borderColor={borderColor}
                                    h={{ base: "63px", md: "95px" }}
                                    w={{ base: "63px", md: "95px" }}
                                    me='10px'
                                />
                                <PinInputField
                                    onChange={(e) => setpin6(e.target.value)}
                                    value={pin6}
                                    fontSize='36px'
                                    color={textColor}
                                    borderRadius='16px'
                                    borderColor={borderColor}
                                    h={{ base: "63px", md: "95px" }}
                                    w={{ base: "63px", md: "95px" }}
                                />
                            </PinInput>
                        </Flex>
                        <Button
                            onClick={activateCard}
                            isLoading={props.loading}
                            className='btn-custom-dark-background'
                            fontSize='14px'
                            variant='brand'
                            borderRadius='16px'
                            fontWeight='500'
                            w='100%'
                            h='50'
                            mb='24px'
                            mt='12px'>
                            Activate Card
                        </Button>
                    </FormControl>
                    {/* <Text
                        color={textColorDetails}
                        fontWeight='400'
                        fontSize='14px'
                        mx={{ base: "auto", lg: "unset" }}
                        textAlign={{ base: "center", lg: "left" }}>
                        Haven't received it?
                        <Text color={textColorBrand} as='span' ms='5px' fontWeight='500'>
                            Resend a new code
                        </Text>
                    </Text> */}
                    {error&&<Alert status='error'>
                        <AlertIcon />
                        <AlertTitle>Error</AlertTitle>
                        <AlertDescription>{error}</AlertDescription>
                    </Alert>}
                </Flex>
            </ModalBody>
            <ModalFooter>
                <Button onClick={onActClose}>Cancel</Button>
            </ModalFooter>
        </ModalContent>
    </Modal>
};
