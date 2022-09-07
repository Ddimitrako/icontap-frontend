// Chakra imports
import {
  Alert,
  AlertDescription,
  AlertIcon,
  Button,
  Flex,
  FormControl,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import Card from "components/card/Card.js";
import InputField from "components/fields/InputField";
import { catchError } from "Helpers/Auth";
import { getAuth } from "Helpers/Auth";
import React, { useState } from "react";
var hostName = process.env.REACT_APP_HOSTNAME.toString()
export default function Settings() {
  // Chakra Color Mode
  const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
  const textColorSecondary = "secondaryGray.600";

  const [oldpsw, setoldpsw] = useState();
  const [newpsw, setnewpsw] = useState();
  const [conf, setconf] = useState();

  const [loading, setloading] = useState(false);
  const [success, setsuccess] = useState(null);
  const [error, seterror] = useState(null);
  const axios = require('axios').default;

  axios.interceptors.request.use(
    config => {
      config.headers.Authorization = `Bearer ${getAuth()}`;
      return config;
    }
  );

  function postToApi() {
    setloading(true);
    setsuccess(null);
    localStorage.clear();
    axios({
      method: 'post',
      url: hostName+`/api/change-password`,
      data:{
        "current_password": oldpsw,
        "new_password": newpsw,
        "c_password": conf
      }
    }).then((response) => {
      console.log(response);
      setsuccess('Password changed succesfully');
    }).catch((err) => {
      console.log(err.response);
      catchError(err);
      seterror("Error!")
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
          {success&&
            <Alert status="success">
              <AlertIcon></AlertIcon>
              <AlertDescription>{success}</AlertDescription>
            </Alert>
          }
          {error&&
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
              id='old'
              label='Old Password'
              placeholder='@john123'
              type="password"
              value={oldpsw}
              onChange={(e)=>setoldpsw(e.target.value)}
            />
            <InputField
              mb='25px'
              id='new'
              label='New Password'
              placeholder='@john123'
              type="password"
              value={newpsw}
              onChange={(e)=>setnewpsw(e.target.value)}
            />
            <InputField
              mb='25px'
              id='confirm'
              label='New Password Confirmation'
              placeholder='@john123'
              type="password"
              value={conf}
              onChange={(e)=>setconf(e.target.value)}
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
