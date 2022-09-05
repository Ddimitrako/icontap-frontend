import React, { useState } from "react";

// Chakra imports
import {
  Flex,
  Box,
  Button,
    Image,
  IconButton,
  Icon,
  Text,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";

// Custom components
import Card from "components/card/Card.js";
import Mastercard from "components/card/Mastercard";
// Assets
import whitecard from "assets/img/cards/white-card.png";
import blackCard from "assets/img/cards/black-card.png";
import {
  MdAddCircle,
  MdCached,
  MdAdd,
  MdAttachMoney,
    MdEditNote,
    MdDisabledVisible,
    MdEdit,
  MdMoreHoriz,
} from "react-icons/md";
import EditCardModal from "../../../main/account/billing/components/EditCardModal/EditCardModal";
import { useHistory } from "react-router-dom";

export default function IcontapCard(props) {
  const { ...rest } = props;

  let [tabState, setTabState] = useState("card1");
  
  const history = useHistory();

  // Chakra Color Mode
  const iconColor = useColorModeValue("brand.500", "white");
  const greenIcon = useColorModeValue("green.500", "white");
  const redIcon = useColorModeValue("red.500", "white");
  const yellowIcon = useColorModeValue("yellow.500", "white");
  const bgIconButton = useColorModeValue("white", "whiteAlpha.100");
  const bgIconHover = useColorModeValue(
    { bg: "secondaryGray.400" },
    { bg: "whiteAlpha.50" }
  );
  const bgIconFocus = useColorModeValue(
    { bg: "white" },
    { bg: "whiteAlpha.100" }
  );
  const bgButton = useColorModeValue("secondaryGray.300", "whiteAlpha.100");
  const bgHover = useColorModeValue(
    { bg: "secondaryGray.400" },
    { bg: "whiteAlpha.50" }
  );
  const bgFocus = useColorModeValue(
    { bg: "secondaryGray.300" },
    { bg: "whiteAlpha.100" }
  );
  const boxBg = useColorModeValue("secondaryGray.300", "whiteAlpha.100");
  const shadow = useColorModeValue(
    "18px 17px 40px 4px rgba(112, 144, 176, 0.1)",
    "unset"
  );
  const textColor = useColorModeValue("secondaryGray.900", "white");

  //Modal Handlers
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <Card {...rest} p='44px'>
      <Flex justify='space-between' mb='25px' align='center'>
        <Text
          color={textColor}
          fontSize='xl'
          fontWeight='700'
          lineHeight='100%'>
          Your Card1
        </Text>

      </Flex>
      <Tabs>
        <TabPanels mb='20px'>
          <TabPanel p='0px'>
            <Image src={whitecard}/>
          </TabPanel>
          <TabPanel p='0px'>
            <Image src={blackCard}/>
          </TabPanel>
        </TabPanels>
        <TabList
          mb='20px'
          mx={{ base: "10px", lg: "30px" }}
          overflowX={{ sm: "unset", lg: "unset" }}
          border='0px solid transparent'>
          <Flex justify='center' w='100%'>
            <Tab
              p='0px'
              flexDirection='column'
              onClick={function () {
                setTabState("card1");
              }}
              me='18px'
              bg='unset'
              _selected={{
                bg: "none",
              }}
              _focus={{ border: "none" }}
              border='0px solid transparent !important'
              _active={{ bg: "none" }}
              minW='max-content'>
              <Box
                w='8px'
                height='8px'
                transition='0.1s linear'
                bg={tabState === "card1" ? "brand.500" : "secondaryGray.500"}
                borderRadius='50%'
              />
            </Tab>
            <Tab
              p='0px'
              flexDirection='column'
              onClick={function () {
                setTabState("card2");
              }}
              me='18px'
              bg='unset'
              _selected={{
                bg: "none",
              }}
              _focus={{ border: "none" }}
              border='0px solid transparent !important'
              _active={{ bg: "none" }}
              minW='max-content'>
              <Box
                w='8px'
                height='8px'
                transition='0.1s linear'
                bg={tabState === "card2" ? "brand.500" : "secondaryGray.500"}
                borderRadius='50%'
              />
            </Tab>

          </Flex>
        </TabList>
      </Tabs>

      <Flex justify='space-between' w='100%'>
        <Flex
          direction='column'
          align='center'
          me={{ base: "16px", md: "0px", "2xl": "36px" }}
          onClick={()=>{
            history.push('/admin/cards/cardProfile');
          }}
          >
          {/* <EditCardModal isOpen={isOpen} onOpen={onOpen} onClose={onClose} /> */}
          <IconButton
            borderRadius='50%'
            bg={bgIconButton}
            _hover={bgIconHover}
            _active={bgIconFocus}
            _focus={bgIconFocus}
            w='56px'
            h='56px'
            mb='5px'
            boxShadow={shadow}
            icon={
              <Icon as={MdEdit} color={greenIcon} w='24px' h='24px' />
            }
          />
          <Text fontSize='sm' fontWeight='500' color={textColor}>
            Edit Card
          </Text>
        </Flex>
        <Flex direction='column' align='center'>
          <IconButton
            borderRadius='50%'
            bg={bgIconButton}
            _hover={bgIconHover}
            _active={bgIconFocus}
            _focus={bgIconFocus}
            w='56px'
            h='56px'
            mb='5px'
            boxShadow={shadow}
            icon={<Icon as={MdDisabledVisible} color={redIcon} w='24px' h='24px' />}
          />
          <Text fontSize='sm' fontWeight='500' color={textColor}>
           Disable Card
          </Text>
        </Flex>
      </Flex>
    </Card>
  );
}
