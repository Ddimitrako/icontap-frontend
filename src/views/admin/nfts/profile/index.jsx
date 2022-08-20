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

import React, { useState } from "react";

// Chakra imports
import {
  Box,
  Button,
  Flex,
  Icon,
  Text,
  useColorModeValue,
  SimpleGrid,
  Select,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from "@chakra-ui/react";

// Custom components
import Banner from "views/admin/nfts/profile/components/Banner";
import NFT from "components/card/NFT";
import { SearchBar } from "views/admin/nfts/profile/components/Search";
import { HSeparator } from "components/separator/Separator";
import YourCard from "views/admin/main/account/billing/components/YourCard";
// Assets
import Nft2 from "assets/img/nfts/Nft2.png";
import Nft4 from "assets/img/nfts/Nft4.png";
import Nft5 from "assets/img/nfts/Nft5.png";
import Nft6 from "assets/img/nfts/Nft6.png";
import NftBanner3 from "assets/img/nfts/NftBanner3.png";
import AvatarSimmmple from "assets/img/avatars/avatarSimmmple.png";
import Avatar1 from "assets/img/avatars/avatar1.png";
import Avatar2 from "assets/img/avatars/avatar2.png";
import Avatar3 from "assets/img/avatars/avatar3.png";
import Avatar4 from "assets/img/avatars/avatar4.png";

import {
  MdDashboard,
  MdApps,
  MdAddCircle,
  MdOutlineCollections,
  MdFormatPaint,
  MdAccessTime,
  MdOutlineLocalOffer,
} from "react-icons/md";
import { IoMdHeartEmpty } from "react-icons/io";
export default function Collection(props) {
  const { ...rest } = props;
  let [tabState, setTabState] = useState("collected");
  const bgButton = useColorModeValue("secondaryGray.300", "whiteAlpha.100");
  const bgHover = useColorModeValue(
    { bg: "secondaryGray.400" },
    { bg: "whiteAlpha.50" }
  );
  const bgFocus = useColorModeValue(
    { bg: "secondaryGray.300" },
    { bg: "whiteAlpha.100" }
  );
  const iconColor = useColorModeValue("brand.500", "white");
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const buttonBg = useColorModeValue("transparent", "navy.800");
  const hoverButton = useColorModeValue(
    { bg: "gray.100" },
    { bg: "whiteAlpha.100" }
  );
  const activeButton = useColorModeValue(
    { bg: "gray.200" },
    { bg: "whiteAlpha.200" }
  );
  const paleGray = useColorModeValue("secondaryGray.400", "whiteAlpha.100");
  let panelExample = (

    <SimpleGrid columns={{ base: 1, md: 2, xl: 4 }} gap='20px'>
        <YourCard></YourCard>
        <YourCard></YourCard>
    </SimpleGrid>
  );
  // Chakra Color Mode
  return (
    <Box pt={{ base: "180px", md: "80px", xl: "80px" }}>
      {/* Main Fields */}
      <Box mb='20px' display={{ base: "block", lg: "grid" }}>

      </Box>
      <Tabs variant='soft-rounded' colorScheme='brandTabs'>

        <HSeparator mb='30px' bg={paleGray} mt='0px' />
        <Flex w='30%'>
          <Select
            fontSize='sm'
            id='edit_product'
            variant='main'
            h='44px'
            maxh='44px'
            me='20px'
            defaultValue='single'>
            <option value='multiple'>All Card</option>
            <option value='single'>Business Card</option>
            <option value='multiple'>Personal Card</option>

          </Select>

          <Button
            me='20px'
            bg={buttonBg}
            border='1px solid'
            color='secondaryGray.600'
            borderColor={useColorModeValue(
              "secondaryGray.100",
              "whiteAlpha.100"
            )}
            borderRadius='16px'
            _placeholder={{ color: "secondaryGray.600" }}
            _hover={hoverButton}
            _active={activeButton}
            _focus={activeButton}>
            <Icon color={textColor} as={MdDashboard} />
          </Button>
          <Button
            bg={buttonBg}
            border='1px solid'
            color='secondaryGray.600'
            borderColor={useColorModeValue(
              "secondaryGray.100",
              "whiteAlpha.100"
            )}
            borderRadius='16px'
            _placeholder={{ color: "secondaryGray.600" }}
            _hover={hoverButton}
            _active={activeButton}
            _focus={activeButton}>
            <Icon color={textColor} as={MdApps} />
          </Button>
        </Flex>

        <Text
          mt='25px'
          mb='36px'
          color={textColor}
          fontSize='2xl'
          ms='24px'
          fontWeight='700'>Your Cards
        </Text>
        <Button
          align='center'
          justifyContent='center'
          bg={bgButton}
          _hover={bgHover}
          _focus={bgFocus}
          _active={bgFocus}
          w='37px'
          h='37px'
          lineHeight='100%'
          borderRadius='10px'
          {...rest}>
          <Icon as={MdAddCircle} color={iconColor} w='24px' h='24px' />
        </Button>

        <TabPanels>
          <TabPanel px='0px'>{panelExample}</TabPanel>
          <TabPanel px='0px'>{panelExample}</TabPanel>
          <TabPanel px='0px'>{panelExample}</TabPanel>
          <TabPanel px='0px'>{panelExample}</TabPanel>
          <TabPanel px='0px'>{panelExample}</TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
}
