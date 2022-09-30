// Chakra imports
import {
  Alert,
  AlertDescription,
  AlertIcon,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import Card from "components/card/Card.js";
import InputField from "components/fields/InputField";
import { hostName } from "Helpers/App";
import { catchError } from "Helpers/Auth";
import { getAuth } from "Helpers/Auth";
import React, { useState } from "react";
import { useEffect } from "react";

export default function Settings() {
  // Chakra Color Mode
  const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
  const textColorSecondary = "secondaryGray.600";

  const [oldpsw, setoldpsw] = useState('');
  const [newpsw, setnewpsw] = useState('');
  const [conf, setconf] = useState('');

  const [loading, setloading] = useState(false);
  const [success, setsuccess] = useState(null);
  const [error, seterror] = useState(null);
  const axios = require('axios').default;

  const errorMsgs={
    WRONG_PASSWORD:'The password is incorrect'
  }

  const ErrorDisplay = ({error}) => (
    <>
      <b>Errors!:</b>
      <div>
      {error?.data ?
        <ul style={{listStyleType:'none'}}>
          {Object.keys(error.data).map((key, i) =>
            <li key={i}>{key} {error.data[key]}</li>
            )}
        </ul>
        :
        errorMsgs[error.message]
      }
      </div>
    </>
  )

  function postToApi() {
    setloading(true);
    setsuccess(null);
    localStorage.clear();
    axios({
      method: 'put',
      url: hostName + `/change-password`,
      data: {
        "current_password": oldpsw,
        "new_password": newpsw,
        "c_password": conf
      }
    }).then((response) => {
      console.log(response);
      setsuccess('Password changed succesfully');
      seterror(null);
    }).catch((err) => {
      console.log(err);
      console.log(err.response);
      catchError(err);
      seterror(<ErrorDisplay error={err.response.data} />);
    }).finally(() => {
      setloading(false);
    })
  }

  return (
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
            <FormLabel
              display='flex'
              ms='4px'
              fontSize='sm'
              fontWeight='500'
              color={'black'}
              mb='8px'>
              Old password<Text color={'blue'}>*</Text>
            </FormLabel>
            <Input
              isRequired
              isInvalid
              errorBorderColor='red.300'
              fontSize='sm'
              ms={{ base: "0px", md: "4px" }}
              placeholder='Old password'
              variant='auth'
              mb='24px'
              size='lg'
              onChange={(e) => setoldpsw(e.target.value)}
              value={oldpsw}
              type='password'
            />
            <FormLabel
              display='flex'
              ms='4px'
              fontSize='sm'
              fontWeight='500'
              color={'black'}
              mb='8px'>
              New password<Text color={'blue'}>*</Text>
            </FormLabel>
            <Input
              isRequired
              isInvalid
              errorBorderColor='red.300'
              fontSize='sm'
              ms={{ base: "0px", md: "4px" }}
              placeholder='New password'
              variant='auth'
              mb='24px'
              size='lg'
              onChange={(e) => setnewpsw(e.target.value)}
              value={newpsw}
              type='password'
            />
            <FormLabel
              display='flex'
              ms='4px'
              fontSize='sm'
              fontWeight='500'
              color={'black'}
              mb='8px'>
              Confirm new password<Text color={'blue'}>*</Text>
            </FormLabel>
            <Input
              isRequired
              isInvalid
              type='password'
              errorBorderColor='red.300'
              fontSize='sm'
              ms={{ base: "0px", md: "4px" }}
              placeholder='New password'
              variant='auth'
              mb='24px'
              size='lg'
              onChange={(e) => setconf(e.target.value)}
              value={conf}
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
  );
}
