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
import { DisplayError } from "Helpers/Auth";
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
  const [errors, seterrors]=useState({});

  function postToApi() {
    setloading(true);
    setsuccess(null);
    localStorage.clear();
    axios({
      method: 'post',
      url: hostName + `/change-password`,
      data: {
        "current_password": oldpsw,
        "new_password": newpsw,
        "c_password": conf
      }
    }).then((response) => {
      console.log(response);
      setsuccess('Password changed succesfully');
    }).catch((err) => {
      console.log(err);
      console.log(err.response);
      catchError(err);
      seterror("Error!");
      seterrors(err.response.data.data);
    }).finally(() => {
      setloading(false);
    })
  }

  useEffect(() => {
    console.trace();
    console.log('oldpsw', oldpsw);
  }, [oldpsw]);

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
            />
            <DisplayError errors={errors?.name} />
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
            />
            <DisplayError errors={errors?.name} />
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
            <DisplayError errors={errors?.name} />
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
