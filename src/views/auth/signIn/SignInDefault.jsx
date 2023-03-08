/**/

import React, { useState } from "react";
import { NavLink } from "react-router-dom";
// Chakra imports
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  ListItem,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  UnorderedList,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
// Custom components
import { HSeparator } from "components/separator/Separator";
import DefaultAuth from "layouts/auth/types/Default";
// Assets
import illustration from "assets/img/auth/auth.png";
import {imageDirectory} from "../../../Helpers/App";
import { FcGoogle } from "react-icons/fc";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { RiEyeCloseLine } from "react-icons/ri";
import { logIn } from "Helpers/Auth";
import { useEffect } from "react";
import { NeedsEmailVerification } from "Helpers/Auth";
var hostName = process.env.REACT_APP_HOSTNAME.toString()
function SignIn() {
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


  const [loading, setloading] = useState(false);

  const axios = require('axios').default;

  const [email, setemail] = useState('');
  const [pass, setpass] = useState('');

  const [errors, seterrors] = useState({});

  const errorMsgs = {
    USER_NOT_EXISTS: 'This email does not belong to any user',
    PASSWORD_INCORRECT: 'The password is incorrect',
    BLOCKED: 'This account is blocked',
  }

  const DisplayError = () => Object.keys(errors).length > 0 ? <Alert status='error' style={{ marginBottom: '20px' }}>
    <AlertIcon />
    <AlertTitle>{errorMsgs[errors.message]}</AlertTitle>
    <AlertDescription>{errors.data}</AlertDescription>
  </Alert> : <></>;

  const data = {
    email: email,
    password: pass
  }

  function postToApi() {
    setloading(true);
    axios({
      method: 'post',
      url: hostName + `/login`,
      data: data
    }).then((response) => {
      // console.log(response);
      if (response?.data?.data?.verified == '1') {
        logIn(response?.data?.data?.token);
        window.location.href = '/u/cardsList/card';
      }
      else if (response?.data?.data?.verified == '0') {
        localStorage.setItem('unverified', '1');
        onOpen();
      }

    }).catch((err) => {
      // console.log(err.response);
      seterrors({ message: err.response.data.message, data: err.response.data.data });
    }).finally(() => {
      setloading(false);
    })
  }

  const { isOpen, onOpen, onClose } = useDisclosure();

  const [emailVerified, setemailVerified]=useState(false);

  useEffect(() => {
    if(localStorage.getItem('email_verified')==1)
      setemailVerified(true);
    setTimeout(() => {
      localStorage.clear(); 
    }, 100);
  }, []);

  const handleClick = () => setShow(!show);
  return (
    <DefaultAuth illustrationBackground={require('assets/img' + imageDirectory +'/auth.png')} >
      <Flex
        maxW={{ base: "100%", md: "max-content" }}
        w='100%'
        mx={{ base: "auto", lg: "0px" }}
        me='auto'
        h='100%'
        alignItems='start'
        justifyContent='center'
        mb={{ base: "30px", md: "60px" }}
        px={{ base: "25px", md: "0px" }}
        mt={{ base: "40px", md: "14vh" }}
        flexDirection='column'>
        <Box me='auto'>
          <Heading color={textColor} fontSize='36px' mb='10px'>
            Sign In
          </Heading>
          <Text
            mb='36px'
            ms='4px'
            color={textColorSecondary}
            fontWeight='400'
            fontSize='md'>
            Enter your email and password to sign in!
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
          <Flex align='center' mb='25px'>
            <HSeparator />
            <HSeparator />
          </Flex>
          {emailVerified && <Alert status='success' style={{ marginBottom: '20px' }}>
            <AlertIcon />
            <AlertTitle>Success!</AlertTitle>
            <AlertDescription>Email Verified Successfully!</AlertDescription>
          </Alert>}
          <DisplayError />
          <FormControl>
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
              isrequired="true"
              variant='auth'
              fontSize='sm'
              ms={{ base: "0px", md: "0px" }}
              type='email'
              placeholder='email@gmail.com'
              mb='24px'
              fontWeight='500'
              size='lg'
              onChange={(e) => setemail(e.target.value)}
              value={email}
            />
            {/* <DisplayError err='email' /> */}
            <FormLabel
              ms='4px'
              fontSize='sm'
              fontWeight='500'
              color={textColor}
              isrequired="true"
              display='flex'>
              Password<Text color={brandStars}>*</Text>
            </FormLabel>
            <InputGroup size='md'>
              <Input
                isrequired="true"
                fontSize='sm'
                placeholder='********'
                mb='24px'
                size='lg'
                type={show ? "text" : "password"}
                variant='auth'
                onChange={(e) => setpass(e.target.value)}
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
            <Flex justifyContent='space-between' align='center' mb='24px'>
              <FormControl display='flex' alignItems='center'>
                <Checkbox
                  id='remember-login'
                  colorScheme='brandScheme'
                  me='10px'
                />
                <FormLabel
                  htmlFor='remember-login'
                  mb='0'
                  fontWeight='normal'
                  color={textColor}
                  fontSize='sm'>
                  Remember me
                </FormLabel>
              </FormControl>
              <NavLink to='/auth/forgot-password'>
                <Text
                  color={textColorBrand}
                  fontSize='sm'
                  w='124px'
                  fontWeight='500'>
                  Forgot password?
                </Text>
              </NavLink>
            </Flex>
            <Button
              fontSize='sm'
              variant='brand'
              fontWeight='500'
              w='100%'
              h='50'
              mb='24px'
              onClick={postToApi}
              isLoading={loading}
              loadingText={'Please wait...'}
              className='btn-custom-dark-background'
            >
              Login
            </Button>
          </FormControl>
          <Flex
            flexDirection='column'
            justifyContent='center'
            alignItems='start'
            maxW='100%'
            mt='0px'>
            <Text color={textColorDetails} fontWeight='400' fontSize='14px'>
              Not registered yet?
              <NavLink to='/auth/sign-up'>
                <Text
                  color={textColorBrand}
                  as='span'
                  ms='5px'
                  fontWeight='500'>
                  Create an Account
                </Text>
              </NavLink>
            </Text>
          </Flex>
        </Flex>
      </Flex>

      <Modal isOpen={isOpen} onClose={onClose} style={{ backgroundColor: '#FFF6DA' }}>
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

export default SignIn;
