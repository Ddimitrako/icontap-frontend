import React, {useState} from "react";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton, Icon, Flex, PinInput, PinInputField, Text,
} from "@chakra-ui/react";
import {useDisclosure} from '@chakra-ui/react';
import {
    Button,
    FormControl,
    FormLabel,
    IconButton,
    Input,
    InputGroup,
    InputLeftElement,
    useColorModeValue,
} from "@chakra-ui/react";
import {SearchIcon} from "@chakra-ui/icons";
import {MdAddCircle} from "react-icons/md";

export function AddNewCard() {
    const textColor = useColorModeValue("navy.700", "white");
    const textColorDetails = useColorModeValue("navy.700", "secondaryGray.600");
    const textColorBrand = useColorModeValue("brand.500", "white");
    const borderColor = useColorModeValue("secondaryGray.400", "whiteAlpha.100");
    const {isOpen, onOpen, onClose} = useDisclosure()

    const initialRef = React.useRef(null)
    const finalRef = React.useRef(null)

    let [tabState, setTabState] = useState("collected");
    const bgButton = useColorModeValue("secondaryGray.300", "whiteAlpha.100");
    const bgHover = useColorModeValue(
        {bg: "secondaryGray.400"},
        {bg: "whiteAlpha.50"}
    );
    const bgFocus = useColorModeValue(
        {bg: "secondaryGray.300"},
        {bg: "whiteAlpha.100"}
    );
    const iconColor = useColorModeValue("brand.500", "white");
    return (
        <>
            <text>Add a new Card</text>
            <Button
                onClick={onOpen}
                align='center'
                justifyContent='center'
                bg={bgButton}
                _hover={bgHover}
                _focus={bgFocus}
                _active={bgFocus}
                w='37px'
                h='37px'
                lineHeight='100%'
                borderRadius='10px'
            >
                <Icon as={MdAddCircle} color={iconColor} w='24px' h='24px'/>

            </Button>
            {/*<Button ml={4} ref={finalRef}>*/}
            {/*    I'll receive focus on close*/}
            {/*</Button>*/}

            <Modal
                initialFocusRef={initialRef}
                finalFocusRef={finalRef}
                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalOverlay/>
                <ModalContent>
                    <ModalHeader>Add your new Card </ModalHeader>
                    <ModalCloseButton/>
                    <ModalBody pb={16}>
                        <text> Please add your card activation code here.</text>
                        <Flex
                            zIndex='2'
                            direction='column'
                            w={{base: "100%", md: "395px"}}
                            maxW='100%'
                            background='transparent'
                            borderRadius='15px'
                            mx={{base: "auto", lg: "unset"}}
                            me='auto'
                            mb={{base: "20px", md: "auto"}}>
                            <FormControl>
                                <Flex justify='center'>
                                    <PinInput mx='auto' otp>
                                        <PinInputField
                                            fontSize='36px'
                                            color={textColor}
                                            borderRadius='16px'
                                            borderColor={borderColor}
                                            h={{base: "63px", md: "95px"}}
                                            w={{base: "63px", md: "95px"}}
                                            me='10px'
                                        />
                                        <PinInputField
                                            fontSize='36px'
                                            color={textColor}
                                            borderRadius='16px'
                                            borderColor={borderColor}
                                            h={{base: "63px", md: "95px"}}
                                            w={{base: "63px", md: "95px"}}
                                            me='10px'
                                        />
                                        <PinInputField
                                            fontSize='36px'
                                            color={textColor}
                                            borderRadius='16px'
                                            borderColor={borderColor}
                                            h={{base: "63px", md: "95px"}}
                                            w={{base: "63px", md: "95px"}}
                                            me='10px'
                                        />
                                        <PinInputField
                                            fontSize='36px'
                                            color={textColor}
                                            borderRadius='16px'
                                            borderColor={borderColor}
                                            h={{base: "63px", md: "95px"}}
                                            w={{base: "63px", md: "95px"}}
                                            me='10px'
                                        />
                                        <PinInputField
                                            fontSize='36px'
                                            color={textColor}
                                            borderRadius='16px'
                                            borderColor={borderColor}
                                            h={{base: "63px", md: "95px"}}
                                            w={{base: "63px", md: "95px"}}
                                            me='10px'
                                        />
                                        <PinInputField
                                            fontSize='36px'
                                            color={textColor}
                                            borderRadius='16px'
                                            borderColor={borderColor}
                                            h={{base: "63px", md: "95px"}}
                                            w={{base: "63px", md: "95px"}}
                                        />
                                    </PinInput>
                                </Flex>
                                <Button
                                    fontSize='14px'
                                    variant='brand'
                                    borderRadius='16px'
                                    fontWeight='500'
                                    w='100%'
                                    h='50'
                                    mb='24px'
                                    mt='12px'>
                                    Add Card
                                </Button>
                            </FormControl>
                            <Text
                                color={textColorDetails}
                                fontWeight='400'
                                fontSize='14px'
                                mx={{base: "auto", lg: "unset"}}
                                textAlign={{base: "center", lg: "left"}}>
                                Haven't received it?
                                <Text color={textColorBrand} as='span' ms='5px' fontWeight='500'>
                                    Resend a new code
                                </Text>
                            </Text>
                        </Flex>
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={onClose}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}
