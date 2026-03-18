// Chakra imports
import {
  Alert,
  AlertDescription,
  AlertIcon,
  Box,
  Button,
  Flex,
  FormControl,
  Heading,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import Card from "components/card/Card.js";
import InputField from "components/fields/InputField";
import { catchError } from "Helpers/Auth";
import { getAuth } from "Helpers/Auth";
import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";

import DefaultAuth from "layouts/auth/types/Default";

import illustration from "assets/img/auth/auth.png";
import {imageDirectory} from "../../../../../../Helpers/App";
var hostName = String(process.env.REACT_APP_HOSTNAME || '')
export default function ResetPassword({ reset }) {
  // Chakra Color Mode
  const textColorPrimary = '#3A3A3A';
  const textColorSecondary = "secondaryGray.600";

  const [newpsw, setnewpsw] = useState();
  const [conf, setconf] = useState();

  const [loading, setloading] = useState(false);
  const [success, setsuccess] = useState(null);
  const [error, seterror] = useState(null);
  const axios = require('axios').default;

  const location = useLocation();

  let email = location.search;
  email = new URLSearchParams(email);
  email = email.get("email");

  const { token } = useParams();

  useEffect(() => {
    // console.log(email, token);
  }, []);

  function postToApi() {
    setloading(true);
    setsuccess(null);
    localStorage.clear();
    axios({
      method: 'post',
      url: hostName+`/${reset ? 'reset' : 'change'}-password`,
      data: {
        "token":token,
        "email":email,
        "password": newpsw,
        "password_confirmation": conf
      }
    }).then((response) => {
      // console.log(response);
      setsuccess('Password changed succesfully');
      setTimeout(() => {
        window.location.href = '/auth/sign-in';
        setloading(false);
      }, 3000);
    }).catch((err) => {
      // console.log(err.response);
      catchError(err);
      seterror("Error!")
      setloading(false);
    }).finally(() => {
    })
  }

  const textColor = useColorModeValue("navy.700", "white");

  return (
    <DefaultAuth illustrationBackground={require('assets/img' + imageDirectory +'/auth.png')} >
      <Flex
        w='100%'
        maxW='max-content'
        mx={{ base: "auto", lg: "0px" }}
        me='auto'
        h='100%'
        alignItems='start'
        justifyContent='center'
        mb={{ base: "30px", md: "60px", lg: "100px", xl: "60px" }}
        px={{ base: "25px", md: "0px" }}
        mt={{ base: "40px", lg: "16vh", xl: "22vh" }}
        flexDirection='column'>

        {/* <Box me='auto' mb='34px'>
          <Heading
            color={textColor}
            fontSize={{ base: "3xl", md: "36px" }}
            mb='16px'>
            Forgot your password?
          </Heading>
          <Text
            color={textColorSecondary}
            fontSize='md'
            w={{ base: "100%", lg: "456px" }}
            maxW='100%'>
            No problem. Just let us know your email address and we'll email you
            a password reset link that will allow you to choose a new one.
          </Text>
        </Box> */}
        <Flex
          zIndex='2'
          direction='column'
          w={{ base: "100%", lg: "456px" }}
          maxW='100%'
          background='transparent'
          borderRadius='15px'
          mx={{ base: "auto", lg: "unset" }}
          me='auto'
          mb={{ base: "20px", md: "auto" }}
          align='start'>
          <FormControl>
            <Card>
              <Flex direction='column' mb='40px' ms='10px'>
                <Text fontSize='xl' color={textColorPrimary} fontWeight='bold'>
                  Change password
                </Text>
                <Text fontSize='md' color={textColorSecondary}>
                  Here you can set your new password
                </Text>
                {success &&
                  <Alert status="success">
                    <AlertIcon></AlertIcon>
                    <AlertDescription>{success}</AlertDescription>
                  </Alert>
                }
                {error &&
                  <Alert status="error">
                    <AlertIcon></AlertIcon>
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                }
              </Flex>
              <FormControl>
                <Flex flexDirection='column'>
                  <InputField
                    mb='25px'
                    id='new'
                    label='New Password'
                    placeholder='@john123'
                    type="password"
                    value={newpsw}
                    onChange={(e) => setnewpsw(e.target.value)}
                  />
                  <InputField
                    mb='25px'
                    id='confirm'
                    label='New Password Confirmation'
                    placeholder='@john123'
                    type="password"
                    value={conf}
                    onChange={(e) => setconf(e.target.value)}
                  />
                </Flex>
              </FormControl>
              <Button
                isLoading={loading}
                variant='brand'
                minW='183px'
                fontSize='sm'
                fontWeight='500'
                ms='auto'
                onClick={postToApi}
              >
                Change Password
              </Button>
            </Card>
          </FormControl>
        </Flex>
      </Flex>
    </DefaultAuth>
  );
}
