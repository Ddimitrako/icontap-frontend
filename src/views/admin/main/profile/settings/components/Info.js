// Chakra imports
import {
  Button,
  Flex,
  FormControl,
  SimpleGrid,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import Card from "components/card/Card.js";
import InputField from "components/fields/InputField";
import TextField from "components/fields/TextField";
import React from "react";
export default function Settings() {
  // Chakra Color Mode
  const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
  const textColorSecondary = "secondaryGray.600";
  return (
    <FormControl>
      <Card>
        <Flex direction='column' mb='40px' ms='10px'>
          <Text fontSize='xl' color={textColorPrimary} fontWeight='bold'>
            Card Info
          </Text>
        </Flex>
        <SimpleGrid
          columns={{ sm: 1, md: 2 }}
          spacing={{ base: "20px", xl: "20px" }}>

          <InputField
            mb='25px'
            id='last_name'
            label='Full Name'
            placeholder='John kehas'
          />
        </SimpleGrid>
        <TextField
          id='about'
          label='Bio'
          h='100px'
          placeholder='Tell something about yourself in 150 characters!'
        />
        <Button
          variant='brand'
          minW='183px'
          fontSize='sm'
          fontWeight='500'
          ms='auto'>
          Save changes
        </Button>
      </Card>
    </FormControl>
  );
}
