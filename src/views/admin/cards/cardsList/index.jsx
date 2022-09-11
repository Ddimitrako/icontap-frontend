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
import { AddNewCard } from "./components/AddNewCard";
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
import IcontapCard from "./components/Card";
// Custom components
import Banner from "views/admin/cards/cardsList/components/Banner";
import NFT from "components/card/NFT";
import { SearchBar } from "views/admin/cards/cardsList/components/Search";
import { HSeparator } from "components/separator/Separator";
import YourCard from "views/admin/main/account/billing/components/YourCard";
// Assets
import Nft2 from "assets/img/cards/Nft2.png";
import Nft4 from "assets/img/cards/Nft4.png";
import Nft5 from "assets/img/cards/Nft5.png";
import Nft6 from "assets/img/cards/Nft6.png";
import NftBanner3 from "assets/img/cards/NftBanner3.png";
import AvatarSimmmple from "assets/img/avatars/avatarSimmmple.png";
import Avatar1 from "assets/img/avatars/avatar1.png";
import Avatar2 from "assets/img/avatars/avatar2.png";
import Avatar3 from "assets/img/avatars/avatar3.png";
import Avatar4 from "assets/img/avatars/avatar4.png";
import axios from "axios";

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
import { useEffect } from "react";
import { getMe } from "Helpers/Auth";
import { useContext } from "react";
import { MeContext } from "Helpers/Auth";
import { useState } from "react";
import { hostName } from "Helpers/App";
export default function Collection(props) {

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

  const [cards, setCards]=useState([]);

  let panelCards = (
    <SimpleGrid columns={{ base: 1, md: 2, xl: 4 }} gap='20px'>
      {cards.map((card, index)=>
        <IcontapCard card={card} key={index} />
      )}
    </SimpleGrid>
  );

  const [Me, setMe]=useContext(MeContext);

  useEffect(() => {
    if(Me.id)
    axios({
      method:'get',
      url:`${hostName}/user/${Me.id}/cards`
    }).then((response)=>{
      console.log(response);
      setCards(response.data.data);
    }).catch((err)=>{
      console.log(err.response);
    })
  }, [Me]);

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
            defaultValue='multiple'>
            <option value='multiple'>All Cards</option>
            <option value='single'>Business Cards</option>
            <option value='multiple'>Personal Cards</option>

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
        <AddNewCard />
        <TabPanels>
          <TabPanel px='0px'>{panelCards}</TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
}
