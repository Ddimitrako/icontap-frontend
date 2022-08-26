import React from "react";

// Chakra imports
import {Flex, Image, useColorModeValue} from "@chakra-ui/react";

// Custom components
import { IcontapLogo } from "components/icons/Icons";
import { HSeparator } from "components/separator/Separator";
import logo from "assets/img/logo/logo.svg";
export function SidebarBrand() {
  //   Chakra color mode
  let logoColor = useColorModeValue("navy.700", "white");

  return (
    <Flex align='center' direction='column'>
      <Image w='110px' h='110px' borderRadius='16px' src={logo}></Image>
      {/*<IcontapLogo h='26px' w='175px' my='32px' color={logoColor} />*/}
      <HSeparator mb='20px' />
    </Flex>
  );
}

export default SidebarBrand;
