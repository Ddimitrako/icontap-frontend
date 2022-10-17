/**/
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
  useDisclosure,
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
import { useParams } from "react-router-dom";
import { demoCard } from "Helpers/Cards";
import { ActivateCardModal } from "Helpers/Cards";
export default function Collection(props) {

  const [Me, setMe] = useContext(MeContext);

  const [firstTime, setFirstTime] = useState(true);
  const [loading, setloading] = useState(true);
  const [loadingCreate, setloadingCreate] = useState(true);

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

  const [cards, setCards] = useState([]);

  let panelCards = (
    <SimpleGrid columns={{ base: 1, md: 2, xl: 4 }} gap='20px'>
      {!loading && !(cards?.length!=0) &&
      <span>No available card physical card only link – click <a style={{fontWeight:'bold'}} href="https://icontap.gr/shop-2/">here</a> to buy </span>
      }
      {/* <IcontapCard card={demoCard}/> */}
      {!loading ? cards.map((card, index) =>
        <IcontapCard card={card} key={index} getcards={()=>getCards()} />
      ) : <Button isLoading
        loadingText="Please wait"
        variant="transparent-with-icon"
        spinnerPlacement="start"></Button>}
    </SimpleGrid>
  );

  let { userId } = useParams();
  const statedUser=props?.history?.location?.state?.user;
  const currUserId=userId??Me.id;

  function getCards() {
    setloading(true);
    axios({
      method: 'get',
      url: `${hostName}/user/${currUserId}/cards`
    }).then((response) => {
      console.log(response);
      setCards(response.data.data);
    }).catch((err) => {
      console.log(err.response);
    }).finally(() => {
      setloading(false);
      setloadingCreate(false);
    })
  }

  useEffect(() => {
    if (Me.id && firstTime) {
      setFirstTime(false);
      // console.log(Me);
      getCards();
    }
  }, [Me]);

  function createCard() {
    setloadingCreate(true);
    axios({
      method: 'post',
      url: `${hostName}/card`,
      data: {
        "title": `Dummy card ${Math.random()}`,
        "is_personal": true,
      }
    }).then((response => {
      console.log(response);
      axios({
        method: 'post',
        url: `${hostName}/card/${response.data.data.code}/profile`
      }).then((response) => {
        props.getCards();
        console.log(response);
      }).catch((err) => {
        console.log(err.response);
      })
    })).catch((err) => {
      console.log(err.response);
    })
  }

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

  const activateModalDisclosure = useDisclosure();

  // Chakra Color Mode
  return (
    <Box pt={{ base: "180px", md: "80px", xl: "80px" }}>
      {/* Main Fields */}
      <Box mb='20px' display={{ base: "block", lg: "grid" }}>

      </Box>
      <Tabs variant='soft-rounded' colorScheme='brandTabs'>

        <HSeparator mb='30px' bg={paleGray} mt='0px' />
        {/*<Flex w='30%'>*/}
        {/*  <Select*/}
        {/*    fontSize='sm'*/}
        {/*    id='edit_product'*/}
        {/*    variant='main'*/}
        {/*    h='44px'*/}
        {/*    maxh='44px'*/}
        {/*    me='20px'*/}
        {/*    defaultValue='multiple'>*/}
        {/*    <option value='multiple'>All Cards</option>*/}
        {/*    <option value='single'>Business Cards</option>*/}
        {/*    <option value='multiple'>Personal Cards</option>*/}

        {/*  </Select>*/}

        {/*  <Button*/}
        {/*    me='20px'*/}
        {/*    bg={buttonBg}*/}
        {/*    border='1px solid'*/}
        {/*    color='secondaryGray.600'*/}
        {/*    borderColor={useColorModeValue(*/}
        {/*      "secondaryGray.100",*/}
        {/*      "whiteAlpha.100"*/}
        {/*    )}*/}
        {/*    borderRadius='16px'*/}
        {/*    _placeholder={{ color: "secondaryGray.600" }}*/}
        {/*    _hover={hoverButton}*/}
        {/*    _active={activeButton}*/}
        {/*    _focus={activeButton}>*/}
        {/*    <Icon color={textColor} as={MdDashboard} />*/}
        {/*  </Button>*/}
        {/*  <Button*/}
        {/*    bg={buttonBg}*/}
        {/*    border='1px solid'*/}
        {/*    color='secondaryGray.600'*/}
        {/*    borderColor={useColorModeValue(*/}
        {/*      "secondaryGray.100",*/}
        {/*      "whiteAlpha.100"*/}
        {/*    )}*/}
        {/*    borderRadius='16px'*/}
        {/*    _placeholder={{ color: "secondaryGray.600" }}*/}
        {/*    _hover={hoverButton}*/}
        {/*    _active={activeButton}*/}
        {/*    _focus={activeButton}>*/}
        {/*    <Icon color={textColor} as={MdApps} />*/}
        {/*  </Button>*/}
        {/*</Flex>*/}

        <Text
          mt='25px'
          mb='36px'
          color={textColor}
          fontSize='2xl'
          ms='24px'
          fontWeight='700'>{(statedUser && statedUser?.id!=Me.id)?`${statedUser?.name} ${statedUser?.last_name}'s`:'Your'} Cards
        </Text>

        <Text>Add a new Card</Text>
        {/* <Button
          onClick={createCard}
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
          isLoading={loadingCreate}
        >
          <Icon as={MdAddCircle} color={'red'} w='24px' h='24px' />

        </Button> */}
        <Button
          onClick={()=>activateModalDisclosure.onOpen()}
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
          isLoading={loadingCreate}
        >
          <Icon as={MdAddCircle} color={iconColor} w='24px' h='24px' />

        </Button>
        <ActivateCardModal activateModalDisclosure={activateModalDisclosure} loading={loading} setloading={setloading} getcards={getCards} />
        <TabPanels>
          <TabPanel px='0px'>{panelCards}</TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
}
