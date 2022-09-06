/*!
  _   _  ___  ____  ___ ________  _   _   _   _ ___   ____  ____   ___  
 | | | |/ _ \|  _ \|_ _|__  / _ \| \ | | | | | |_ _| |  _ \|  _ \ / _ \ 
 | |_| | | | | |_) || |  / / | | |  \| | | | | || |  | |_) | |_) | | | |
 |  _  | |_| |  _ < | | / /| |_| | |\  | | |_| || |  |  __/|  _ <| |_| |
 |_| |_|\___/|_| \_\___/____\___/|_| \_|  \___/|___| |_|   |_| \_\\___/ 
                                                                                                                                                                                                                                                                                                                                       
=========================================================
* Horizon UI Dashboard PRO - v1.0.0
=========================================================

* Product Page: https://www.horizon-ui.com/pro/
* Copyright 2022 Horizon UI (https://www.horizon-ui.com/)

* Designed and Coded by Simmmple

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

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
  SimpleGrid,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
// Assets
import illustration from "assets/img/auth/auth.png";
import { HSeparator } from "components/separator/Separator";
import DefaultAuth from "layouts/auth/types/Default";
import { NavLink } from "react-router-dom";
import React from "react";
import { FcGoogle } from "react-icons/fc";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { RiEyeCloseLine } from "react-icons/ri";
import { useState } from "react";

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

  const [loading, setloading]=useState(false);
  
  const axios = require('axios').default;

  const [email, setemail]=useState('');
  const [name, setname]=useState('');
  const [lastname, setlastname]=useState('');
  const [pass, setpass]=useState('');
  const [cpass, setcpass]=useState('');

  const data={
    email:email,
    name:name,
    last_name:lastname,
    password:pass,
    c_password:cpass,
  }

  function postToApi() {
    setloading(true);
    axios({
      method:'post',
      url:`http://127.0.0.1:8000/api/register`,
      data:data
    }).then((response)=>{
      console.log(response);
      window.location.href='/auth/sign-in';
    }).catch((err)=>{
      console.log(err.response);
    }).finally(()=>{
      setloading(false);
    })
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
                  isrequired="true"
                  fontSize='sm'
                  ms={{ base: "0px", md: "4px" }}
                  placeholder='First name'
                  variant='auth'
                  mb='24px'
                  size='lg'
                  onChange={(e)=>setname(e.target.value)}
                  value={name}
                />
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
                  isrequired="true"
                  variant='auth'
                  fontSize='sm'
                  placeholder='Last name'
                  mb='24px'
                  size='lg'
                  onChange={(e)=>setlastname(e.target.value)}
                  value={lastname}
                />
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
              isrequired="true"
              variant='auth'
              fontSize='sm'
              type='email'
              placeholder='mail@simmmple.com'
              mb='24px'
              size='lg'
              onChange={(e)=>setemail(e.target.value)}
              value={email}
            />
            <FormLabel
              ms='4px'
              fontSize='sm'
              fontWeight='500'
              isrequired="true"
              color={textColor}
              display='flex'>
              Password<Text color={brandStars}>*</Text>
            </FormLabel>
            <InputGroup size='md'>
              <Input
                isrequired="true"
                variant='auth'
                fontSize='sm'
                ms={{ base: "0px", md: "4px" }}
                placeholder='Min. 8 characters'
                mb='24px'
                size='lg'
                type={show ? "text" : "password"}
                onChange={(e)=>setpass(e.target.value)}
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
            <FormLabel
              ms='4px'
              fontSize='sm'
              fontWeight='500'
              isrequired="true"
              color={textColor}
              display='flex'>
              Repeat Password<Text color={brandStars}>*</Text>
            </FormLabel>
            <InputGroup size='md'>
              <Input
                isrequired="true"
                variant='auth'
                fontSize='sm'
                ms={{ base: "0px", md: "4px" }}
                placeholder='Min. 8 characters'
                mb='24px'
                size='lg'
                type={show ? "text" : "password"}
                onChange={(e)=>setcpass(e.target.value)}
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
            <Flex justifyContent='space-between' align='center' mb='24px'>
              <FormControl display='flex' alignItems='start'>
                <Checkbox
                  id='remember-login'
                  colorScheme='brandScheme'
                  me='10px'
                  mt='3px'
                />
                <FormLabel
                  htmlFor='remember-login'
                  mb='0'
                  fontWeight='normal'
                  color={textColor}
                  fontSize='sm'>
                  By creating an account means you agree to the{" "}
                  <Link
                    href='https://google.gr'
                    fontWeight='500'>
                    Terms and Conditions,
                  </Link>{" "}
                  and our{" "}
                  <Link
                    href='https://simmmple.com/privacy-policy'
                    fontWeight='500'>
                    Privacy Policy
                  </Link>
                </FormLabel>
              </FormControl>
            </Flex>
            <Button
              variant='brand'
              fontSize='14px'
              fontWeight='500'
              w='100%'
              h='50'
              mb='24px'
              onClick={postToApi}  
              isLoading={loading}
              loadingText={'Please wait...'}
            >

              Create my account
            </Button>
          </FormControl>
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
    </DefaultAuth>
  );
}

export default SignUp;
