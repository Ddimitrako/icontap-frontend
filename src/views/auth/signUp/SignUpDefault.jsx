/**/
import { CheckIcon, AddIcon, WarningIcon } from '@chakra-ui/icons'
import { PasswordValidator } from "../../../components/PasswordValidator";
// Chakra imports
import {
    Box,
    Button,
    Checkbox,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    Icon,
    Input,
    InputGroup,
    InputRightElement,
    Link,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    SimpleGrid,
    Text,
    useColorModeValue,
    useDisclosure,
} from "@chakra-ui/react";
// Assets
import illustration from "assets/img/auth/auth.png";
import { HSeparator } from "components/separator/Separator";
import DefaultAuth from "layouts/auth/types/Default";
import { NavLink } from "react-router-dom";
import React, { useEffect } from "react";
import { FcGoogle } from "react-icons/fc";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { RiEyeCloseLine } from "react-icons/ri";
import { useState } from "react";
import { DisplayError } from "Helpers/Auth";
import { Grid, GridItem } from '@chakra-ui/react'
import { NeedsEmailVerification } from 'Helpers/Auth';
var hostName = process.env.REACT_APP_HOSTNAME.toString()

function SignUp() {
    // Chakra color mode
    const textColor = useColorModeValue("navy.700", "white");
    const textColorSecondary = "gray.400";
    const textColorDetails = useColorModeValue("navy.700", "secondaryGray.600");
    const textColorBrand = useColorModeValue("brand.500", "white");
    const brandStars = useColorModeValue("brand.500", "brand.400");
    const googleBg = useColorModeValue("secondaryGray.300", "whiteAlpha.200");
    const googleText = useColorModeValue("navy.700", "white");
    const googleHover = useColorModeValue(
        { bg: "gray.200" },
        { bg: "whiteAlpha.300" }
    );
    const googleActive = useColorModeValue(
        { bg: "secondaryGray.300" },
        { bg: "whiteAlpha.200" }
    );
    const [show, setShow] = React.useState(false);
    const handleClick = () => setShow(!show);

    const [loading, setloading] = useState(false);

    const axios = require('axios').default;

    const [email, setemail] = useState('');
    const [name, setname] = useState('');
    const [lastname, setlastname] = useState('');
    const [pass, setpass] = useState('');
    const [cpass, setcpass] = useState('');

    const [errors, seterrors] = useState({});

    const [
        validLength,
        hasNumber,
        upperCase,
        lowerCase,
        specialChar,
    ] = PasswordValidator({
        firstPassword: pass,

    });
    useEffect(() => {
        console.log(validLength,
            hasNumber,
            upperCase,
            lowerCase,
            specialChar)
    }, [validLength,
        hasNumber,
        upperCase,
        lowerCase,
        specialChar]);

    const data = {
        email: email,
        name: name,
        last_name: lastname,
        password: pass,
        c_password: cpass,
    }

    const { isOpen, onOpen, onClose } = useDisclosure();

    function closeModal() {
        onClose();
        window.location.href = '/auth/sign-in';
    }

    function postToApi(e) {
        setloading(true);
        axios({
            method: 'post',
            url: hostName + `/register`,
            data: data
        }).then((response) => {
            // console.log(response);
            onOpen();
        }).catch((err) => {
            console.log(err.response);
            console.log(err.response.data.data);
            seterrors(err.response.data.data);
        }).finally(() => {
            setloading(false);
        })
        e.preventDefault();

    }


    return (
        <DefaultAuth illustrationBackground={illustration} image={illustration}>
            <Flex
                w='100%'
                maxW='max-content'
                mx={{ base: "auto", lg: "0px" }}
                me='auto'
                h='100%'
                justifyContent='center'
                mb={{ base: "30px", md: "60px" }}
                px={{ base: "25px", md: "0px" }}
                mt={{ base: "40px", md: "8vh" }}
                flexDirection='column'>
                <Box me='auto'>
                    <Heading
                        color={textColor}
                        fontSize={{ base: "34px", lg: "36px" }}
                        mb='10px'>
                        Sign Up
                    </Heading>
                    <Text
                        mb='36px'
                        ms='4px'
                        color={textColorSecondary}
                        fontWeight='400'
                        fontSize='md'>
                        Enter your email and password to sign up!
                    </Text>
                </Box>
                <Flex
                    zIndex='2'
                    direction='column'
                    w={{ base: "100%", md: "420px" }}
                    maxW='100%'
                    background='transparent'
                    borderRadius='15px'
                    mx={{ base: "auto", lg: "unset" }}
                    me='auto'
                    mb={{ base: "20px", md: "auto" }}>
                    {/*<Button*/}
                    {/*  fontSize='sm'*/}
                    {/*  me='0px'*/}
                    {/*  mb='26px'*/}
                    {/*  py='15px'*/}
                    {/*  h='50px'*/}
                    {/*  borderRadius='16px'*/}
                    {/*  bg={googleBg}*/}
                    {/*  color={googleText}*/}
                    {/*  fontWeight='500'*/}
                    {/*  _hover={googleHover}*/}
                    {/*  _active={googleActive}*/}
                    {/*  _focus={googleActive}>*/}
                    {/*  <Icon as={FcGoogle} w='20px' h='20px' me='10px' />*/}
                    {/*  Sign up with Google*/}
                    {/*</Button>*/}
                    <Flex align='center' mb='25px'>
                        <HSeparator />
                        {/*<Text color={textColorSecondary} mx='14px'>*/}
                        {/*  or*/}
                        {/*</Text>*/}
                        <HSeparator />
                    </Flex>

                    <form onSubmit={postToApi}>
                        <FormControl>
                            <SimpleGrid
                                columns={{ base: "1", md: "2" }}
                                gap={{ sm: "10px", md: "26px" }}>
                                <Flex direction='column'>
                                    <FormLabel
                                        display='flex'
                                        ms='4px'
                                        fontSize='sm'
                                        fontWeight='500'
                                        color={textColor}
                                        mb='8px'>
                                        First name<Text color={brandStars}>*</Text>
                                    </FormLabel>
                                    <Input
                                        
                                        isInvalid
                                        errorBorderColor='red.300'
                                        fontSize='sm'
                                        ms={{ base: "0px", md: "4px" }}
                                        placeholder='First name'
                                        variant='auth'
                                        mb='24px'
                                        size='lg'
                                        onChange={(e) => setname(e.target.value)}
                                        value={name}
                                    />
                                    <DisplayError errors={errors?.name} />
                                </Flex>
                                <Flex direction='column'>
                                    <FormLabel
                                        display='flex'
                                        ms='4px'
                                        fontSize='sm'
                                        fontWeight='500'
                                        color={textColor}
                                        mb='8px'>
                                        Last name<Text color={brandStars}>*</Text>
                                    </FormLabel>
                                    <Input
                                        
                                        variant='auth'
                                        fontSize='sm'
                                        placeholder='Last name'
                                        mb='24px'
                                        size='lg'
                                        onChange={(e) => setlastname(e.target.value)}
                                        value={lastname}
                                    />
                                    <DisplayError errors={errors?.last_name} />
                                </Flex>
                            </SimpleGrid>
                            <FormLabel
                                display='flex'
                                ms='4px'
                                fontSize='sm'
                                fontWeight='500'
                                color={textColor}
                                mb='8px'>
                                Email<Text color={brandStars}>*</Text>
                            </FormLabel>
                            <Input
                                
                                variant='auth'
                                fontSize='sm'
                                type='email'
                                placeholder='mail@simmmple.com'
                                mb='24px'
                                size='lg'
                                onChange={(e) => setemail(e.target.value)}
                                value={email}
                            />
                            <DisplayError errors={errors?.email} />
                            <FormLabel
                                ms='4px'
                                fontSize='sm'
                                fontWeight='500'
                                
                                color={textColor}
                                display='flex'>
                                Password<Text color={brandStars}>*</Text>
                            </FormLabel>
                            <InputGroup size='md'>
                                <Input
                                    
                                    variant='auth'
                                    fontSize='sm'
                                    ms={{ base: "0px", md: "4px" }}
                                    placeholder='Min. 8 characters'
                                    mb='24px'
                                    size='lg'
                                    type={show ? "text" : "password"}
                                    onChange={(e) => {

                                        setpass(e.target.value)


                                    }}
                                    value={pass}
                                />
                                <InputRightElement display='flex' alignItems='center' mt='4px'>
                                    <Icon
                                        color={textColorSecondary}
                                        _hover={{ cursor: "pointer" }}
                                        as={show ? RiEyeCloseLine : MdOutlineRemoveRedEye}
                                        onClick={handleClick}
                                    />
                                </InputRightElement>
                            </InputGroup>
                            <DisplayError errors={errors?.password} />
                            <FormLabel
                                ms='4px'
                                fontSize='xs'
                                fontWeight='50'
                                color={textColor}
                                display='flex'>
                                <ul>
                                    <li>
                                        <Text >Valid Length: {validLength ? <span><CheckIcon w={3} h={3} color="blue.500" /></span> : <span><WarningIcon w={3} h={3} color="red.500" /></span>}</Text>
                                        <Text>Has a Number: {hasNumber ? <span><CheckIcon w={3} h={3} color="blue.500" /></span> : <span><WarningIcon w={3} h={3} color="red.500" /></span>}</Text>
                                        <Text>UpperCase: {upperCase ? <span><CheckIcon w={3} h={3} color="blue.500" /></span> : <span><WarningIcon w={3} h={3} color="red.500" /></span>}</Text>
                                        <Text> LowerCase: {lowerCase ? <span><CheckIcon w={3} h={3} color="blue.500" /></span> : <span><WarningIcon w={3} h={3} color="red.500" /></span>}</Text>
                                        <Text> Special Character:{" "} {specialChar ? <span><CheckIcon w={3} h={3} color="blue.500" /></span> : <span><WarningIcon w={3} h={3} color="red.500" /></span>}</Text>
                                    </li>

                                </ul>
                            </FormLabel>
                            <FormLabel
                                ms='4px'
                                fontSize='sm'
                                fontWeight='500'
                                
                                color={textColor}
                                display='flex'>
                                Repeat Password<Text color={brandStars}>*</Text>
                            </FormLabel>
                            <InputGroup size='md'>
                                <Input
                                    
                                    variant='auth'
                                    fontSize='sm'
                                    ms={{ base: "0px", md: "4px" }}
                                    placeholder='Min. 8 characters'
                                    mb='24px'
                                    size='lg'
                                    type={show ? "text" : "password"}
                                    onChange={(e) => setcpass(e.target.value)}
                                    value={cpass}
                                />
                                <InputRightElement display='flex' alignItems='center' mt='4px'>
                                    <Icon
                                        color={textColorSecondary}
                                        _hover={{ cursor: "pointer" }}
                                        as={show ? RiEyeCloseLine : MdOutlineRemoveRedEye}
                                        onClick={handleClick}
                                    />
                                </InputRightElement>
                            </InputGroup>
                            <DisplayError errors={errors?.c_password} />
                            {/*<Flex justifyContent='space-between' align='center' mb='24px'>*/}
                            {/*  <FormControl display='flex' alignItems='start'>*/}
                            {/*    <Checkbox*/}
                            {/*      id='remember-login'*/}
                            {/*      colorScheme='brandScheme'*/}
                            {/*      me='10px'*/}
                            {/*      mt='3px'*/}
                            {/*    />*/}
                            {/*    <FormLabel*/}
                            {/*      htmlFor='remember-login'*/}
                            {/*      mb='0'*/}
                            {/*      fontWeight='normal'*/}
                            {/*      color={textColor}*/}
                            {/*      fontSize='sm'>*/}
                            {/*      By creating an account means you agree to the{" "}*/}
                            {/*      <Link*/}
                            {/*        href='https://google.gr'*/}
                            {/*        fontWeight='500'>*/}
                            {/*        Terms and Conditions,*/}
                            {/*      </Link>{" "}*/}
                            {/*      and our{" "}*/}
                            {/*      <Link*/}
                            {/*        href='https://simmmple.com/privacy-policy'*/}
                            {/*        fontWeight='500'>*/}
                            {/*        Privacy Policy*/}
                            {/*      </Link>*/}
                            {/*    </FormLabel>*/}
                            {/*  </FormControl>*/}
                            {/*</Flex>*/}
                            <Button
                                variant='brand'
                                fontSize='14px'
                                fontWeight='500'
                                w='100%'
                                h='50'
                                mb='24px'
                                type='submit'
                                isLoading={loading}
                                className='btn-custom-dark-background'
                                loadingText={'Please wait...'}
                            >

                                Create my account
                            </Button>
                        </FormControl>
                    </form>

                    <Flex
                        flexDirection='column'
                        justifyContent='center'
                        alignItems='start'
                        maxW='100%'
                        mt='0px'>
                        <Text color={textColorDetails} fontWeight='400' fontSize='sm'>
                            Already a member?
                            <NavLink to='/auth/sign-in'>
                                <Text
                                    color={textColorBrand}
                                    as='span'
                                    ms='5px'
                                    fontWeight='500'>
                                    Sign in
                                </Text>
                            </NavLink>
                        </Text>
                    </Flex>
                </Flex>
            </Flex>

            <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={closeModal} style={{ backgroundColor: '#FFF6DA' }}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Attention</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <NeedsEmailVerification />
                    </ModalBody>

                    {/* <ModalFooter>
        <Button variant='ghost' onClick={onClose}>Ok</Button>
      </ModalFooter> */}
                </ModalContent>
            </Modal>
        </DefaultAuth>
    );
}

export default SignUp;
