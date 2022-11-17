import React from "react";

// Chakra imports
import {Flex, Image, useColorModeValue} from "@chakra-ui/react";
import { imageDirectory } from 'Helpers/App';
// Custom components

import { HSeparator } from "components/separator/Separator";

export function SidebarBrand() {
  //   Chakra color mode
  let logoColor = useColorModeValue("navy.700", "white");

  return (
    <Flex align='center' direction='column'>
      <Image w='210px' h='110px' borderRadius='16px' src={require('assets/img' + imageDirectory +'/logo.jpg')}></Image>
      {/*<IcontapLogo h='26px' w='175px' my='32px' color={logoColor} />*/}
      <HSeparator mb='20px' />
    </Flex>
  );
}

export default SidebarBrand;
