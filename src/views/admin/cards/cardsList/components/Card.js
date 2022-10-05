import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  Input,
  PinInput,
  PinInputField,
} from '@chakra-ui/react';
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
  MdCheckCircle,
} from "react-icons/md";
import EditCardModal from "../../../main/account/billing/components/EditCardModal/EditCardModal";
import { useHistory } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { hostName } from "Helpers/App";
import { hostNameStorage } from "Helpers/App";

export default function IcontapCard(props) {
  var clone = Object.assign({}, {a: 1, b: 2, c: 3});
  delete clone.getcards;
  const { ...rest } = clone;

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
  const { isOpen, onOpen, onClose } = useDisclosure();
  const activateModalDisclosure = useDisclosure();
  const isActOpen=activateModalDisclosure.isOpen;
  const onActOpen=activateModalDisclosure.onOpen;
  const onActClose=activateModalDisclosure.onClose;

  // const textColor = useColorModeValue("navy.700", "white");
  const textColorDetails = useColorModeValue("navy.700", "secondaryGray.600");
  const textColorBrand = useColorModeValue("brand.500", "white");
  const borderColor = useColorModeValue("secondaryGray.400", "whiteAlpha.100");

  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  const [pin1, setpin1]=useState(0);
  const [pin2, setpin2]=useState(0);
  const [pin3, setpin3]=useState(0);
  const [pin4, setpin4]=useState(0);
  const [pin5, setpin5]=useState(0);
  const [pin6, setpin6]=useState(0);
  const [activationCode, setactivationCode]=useState();

  const [loading, setloading]=useState(false);

  useEffect(()=>{
    console.log(props.card);
  },[]);

  useEffect(()=>{
    setactivationCode(`${pin1}${pin2}${pin3}${pin4}${pin5}${pin6}`);
  },[pin1,pin2,pin3,pin4,pin5,pin6]);

  // ### Deprecated ### //
  // function activateCard() {
  //   setloading(true);
  //   axios({
  //     method:'put',
  //     url:`${hostName}/card/${props.card.code}/activate`,
  //     data:{
  //       activation_code:activationCode
  //     }
  //   }).then((response)=>{
  //     console.log(response);
  //     props?.getcards();
  //   }).catch((err)=>{
  //     console.log(err.response);
  //   });
  // }


  function activateCard(activate) {
    setloading(true);
    console.log('deactivating');
    axios({
      method:'put',
      url:`${hostName}/card/${props.card.code}/status`,
      data:{
        is_active:activate
      }
    }).then((response)=>{
      console.log(response);
      props?.getcards();
    }).catch((err)=>{
      console.log(err.response);
    }).finally(()=>{
      onClose();
      setloading(false);
    });
  }

  const activateCardBtnModal = <Flex direction='column' align='center'>
    <IconButton onClick={() => {
      console.log(props.card);
      console.log(props.card.activation_code);
      onActOpen();
    }}
      borderRadius='50%'
    bg={bgIconButton}
    _hover={bgIconHover}
    _active={bgIconFocus}
    _focus={bgIconFocus}
    w='56px'
    h='56px'
    mb='5px'
    boxShadow={shadow}
    icon={<Icon as={MdCheckCircle} color={greenIcon} w='24px' h='24px' />}
  />
  <Text fontSize='sm' fontWeight='500' color={textColor}>
    Activate Card
  </Text>

  <Modal
    initialFocusRef={initialRef}
    finalFocusRef={finalRef}
    isOpen={isActOpen}
    onClose={onActClose}
  >
    <ModalOverlay />
    <ModalContent>
      <ModalHeader>Activate your Card </ModalHeader>
      <ModalCloseButton />

      <ModalBody pb={16}>
        <Text> Card ID.</Text>

        <FormControl>
          <Flex justify='center'>
            <Input size='lg' htmlSize={16} width='auto' value={props.card.code} readOnly />
          </Flex>

        </FormControl>
        <hr></hr>
        <Text> Please add your card activation code here.</Text>
        <Flex
          zIndex='2'
          direction='column'
          w={{ base: "100%", md: "395px" }}
          maxW='100%'
          background='transparent'
          borderRadius='15px'
          mx={{ base: "auto", lg: "unset" }}
          me='auto'
          mb={{ base: "20px", md: "auto" }}>

          <FormControl>
            <Flex justify='center'>
              <PinInput mx='auto' otp>
                <PinInputField
                  onChange={(e)=>setpin1(e.target.value)}
                  value={pin1}
                  fontSize='36px'
                  color={textColor}
                  borderRadius='16px'
                  borderColor={borderColor}
                  h={{ base: "63px", md: "95px" }}
                  w={{ base: "63px", md: "95px" }}
                  me='10px'
                />
                <PinInputField
                  onChange={(e)=>setpin2(e.target.value)}
                  value={pin2}
                  fontSize='36px'
                  color={textColor}
                  borderRadius='16px'
                  borderColor={borderColor}
                  h={{ base: "63px", md: "95px" }}
                  w={{ base: "63px", md: "95px" }}
                  me='10px'
                />
                <PinInputField
                  onChange={(e)=>setpin3(e.target.value)}
                  value={pin3}
                  fontSize='36px'
                  color={textColor}
                  borderRadius='16px'
                  borderColor={borderColor}
                  h={{ base: "63px", md: "95px" }}
                  w={{ base: "63px", md: "95px" }}
                  me='10px'
                />
                <PinInputField
                  onChange={(e)=>setpin4(e.target.value)}
                  value={pin4}
                  fontSize='36px'
                  color={textColor}
                  borderRadius='16px'
                  borderColor={borderColor}
                  h={{ base: "63px", md: "95px" }}
                  w={{ base: "63px", md: "95px" }}
                  me='10px'
                />
                <PinInputField
                  onChange={(e)=>setpin5(e.target.value)}
                  value={pin5}
                  fontSize='36px'
                  color={textColor}
                  borderRadius='16px'
                  borderColor={borderColor}
                  h={{ base: "63px", md: "95px" }}
                  w={{ base: "63px", md: "95px" }}
                  me='10px'
                />
                <PinInputField
                  onChange={(e)=>setpin6(e.target.value)}
                  value={pin6}
                  fontSize='36px'
                  color={textColor}
                  borderRadius='16px'
                  borderColor={borderColor}
                  h={{ base: "63px", md: "95px" }}
                  w={{ base: "63px", md: "95px" }}
                />
              </PinInput>
            </Flex>
            <Button
              onClick={activateCard}
              isLoading={loading}
              fontSize='14px'
              variant='brand'
              borderRadius='16px'
              fontWeight='500'
              w='100%'
              h='50'
              mb='24px'
              mt='12px'>
              Activate Card
            </Button>
          </FormControl>
          <Text
            color={textColorDetails}
            fontWeight='400'
            fontSize='14px'
            mx={{ base: "auto", lg: "unset" }}
            textAlign={{ base: "center", lg: "left" }}>
            Haven't received it?
            <Text color={textColorBrand} as='span' ms='5px' fontWeight='500'>
              Resend a new code
            </Text>
          </Text>
        </Flex>
      </ModalBody>
      <ModalFooter>
        <Button onClick={onActClose}>Cancel</Button>
      </ModalFooter>
    </ModalContent>
  </Modal>
</Flex>;

  return (
    <Card {...rest} p='44px' style={{boxShadow:'#cdcdcd 10px 10px 10px'}}>
      <Flex justify='space-between' mb='25px' align='center'>
        <Text
        style={{filter: !props.card.is_active?'blur(2px)':'none'}}
          color={textColor}
          fontSize='xl'
          fontWeight='700'
          lineHeight='100%'>
          {props.card.title}
        </Text>

      </Flex>
      <Tabs style={{filter: !props.card.is_active?'blur(3px)':'none'}}>
        <TabPanels mb='20px'>
          <TabPanel p='0px'>
            {/* <Image src={props?.card?.images?.img_profile?`${hostNameStorage}/${props?.card?.images?.img_profile}`:whitecard} /> */}
            <Image src={whitecard} />
          </TabPanel>
          <TabPanel p='0px'>
            {/* <Image src={props?.card?.images?.img_cover?`${hostNameStorage}/${props?.card?.images?.img_cover}`:blackCard} /> */}
            <Image src={blackCard} />
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
        {true||props.card.is_active?<Flex
          direction='column'
          align='center'
          me={{ base: "16px", md: "0px", "2xl": "36px" }}
          onClick={() => {
            history.push(`/admin/cards/edit/${props.card.code}`);
          }}
        >
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
        </Flex>:''}
        {false&&!props.card.is_active?activateCardBtnModal:''}
        {props.card.is_active?<Flex direction='column' align='center'>
          <IconButton onClick={onOpen}
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
          </Flex>:''}
        {!props.card.is_active ? <Flex direction='column' align='center'>
          <IconButton onClick={()=>activateCard(true)}
            borderRadius='50%'
            bg={bgIconButton}
            _hover={bgIconHover}
            _active={bgIconFocus}
            _focus={bgIconFocus}
            w='56px'
            h='56px'
            mb='5px'
            boxShadow={shadow}
            icon={<Icon as={MdCheckCircle} color={greenIcon} w='24px' h='24px' />}
          />
          <Text fontSize='sm' fontWeight='500' color={textColor}>
            Activate Card
          </Text>
        </Flex> : ''}

        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
            <ModalContent>
              <ModalHeader>Modal Title</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Text>Are you sure you want to disable your card visibility?</Text>
              </ModalBody>

              <ModalFooter>
                <Button colorScheme='blue' mr={3} onClick={()=>activateCard(false)} isLoading={loading}>
                  Yes
                </Button>
                <Button variant='ghost' onClick={onClose}>No</Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </Flex>
    </Card>
  );
}
