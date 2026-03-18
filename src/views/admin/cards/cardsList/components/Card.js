import React, { useState } from "react";
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, FormControl, FormLabel, Input, } from '@chakra-ui/react';
import {
  Flex,
  Box,
  Button,
  IconButton,
  Icon,
  Text,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";

// Custom components
import Card from "components/card/Card.js";
import {
  MdDisabledVisible,
  MdEdit,
  MdCheckCircle,
  MdDeleteForever,
  MdDriveFileRenameOutline,
} from "react-icons/md";
import { useHistory } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { hostName } from "Helpers/App";
import { hostNameStorage } from "Helpers/App";
import { hasRole } from "Helpers/Auth";
import Cover from "../../cardProfile/components/Cover";

export default function PerformanceCard(props) {
  var clone = Object.assign({}, { a: 1, b: 2, c: 3 });
  delete clone.getcards;
  const { ...rest } = clone;
  const card=props.card;

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
  const shadow = "4px 4px 10px grey";
  const textColor = '#3A3A3A';

  //Modal Handlers
  const { isOpen, onOpen, onClose } = useDisclosure();
  const deleteDisclosure = useDisclosure();
  const { isDeleteOpen, onDeleteOpen, onDeleteClose } = { isDeleteOpen: deleteDisclosure.isOpen, onDeleteOpen: deleteDisclosure.onOpen, onDeleteClose: deleteDisclosure.onClose };
  
  const [rename, setrename]=useState(props?.card?.title);
  const renameDisclosure = useDisclosure();
  const { isrenameOpen, onrenameOpen, onrenameClose } = { isrenameOpen: renameDisclosure.isOpen, onrenameOpen: renameDisclosure.onOpen, onrenameClose: renameDisclosure.onClose };
  


  const [loading, setloading] = useState(false);

  useEffect(() => {
    // console.log(props.card);
  }, []);

  function activateCard(activate) {
    setloading(true);
    if (props.card.code != 'demo') {
      // console.log('deactivating');
      axios({
        method: 'put',
        url: `${hostName}/card/${props.card.code}/status`,
        data: {
          is_active: activate
        }
      }).then((response) => {
        // console.log(response);
        props?.getcards();
      }).catch((err) => {
        // console.log(err.response);
      }).finally(() => {
        onClose();
        setloading(false);
      });
    }
    else {
      onClose();
      setloading(false);
    }

  }

  function renameCard() {
    setloading(true);
    if (props.card.code != 'demo') {
      // console.log('deactivating');
      axios({
        method: 'put',
        url: `${hostName}/card/${props.card.code}`,
        data: {
          title: rename
        }
      }).then((response) => {
        // console.log(response);
        props?.getcards();
      }).catch((err) => {
        // console.log(err.response);
      }).finally(() => {
        onrenameClose();
        setloading(false);
      });
    }
    else {
      onrenameClose();
      setloading(false);
    }

  }

  function deleteCard() {
    setloading(true);
    if (props.card.code != 'demo') {
      // console.log('deactivating');
      axios({
        method: 'delete',
        url: `${hostName}/card/${props.card.code}`,
      }).then((response) => {
        // console.log(response);
        props?.getcards();
      }).catch((err) => {
        // console.log(err.response);
      }).finally(() => {
        onClose();
        setloading(false);
      });
    }
    else {
      onClose();
      setloading(false);
    }
  }

  const activateCardBtnModal = <Flex direction='column' align='center'>
    <IconButton onClick={() => {
      // console.log(props.card);
      // console.log(props.card.activation_code);
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
      Activate
    </Text>

  </Flex>;

  return card?(
    <Card {...rest} p='44px' style={{ boxShadow: '#cdcdcd 10px 10px 10px' }}>
      <Box w='100%' style={{ filter: !props.card.is_active ? 'blur(2px)' : 'none' }}>
        <Cover minHeight={100} socialMaxW="60%" avatarRadius={50} avatar={{url: card?.images?.img_profile ? `${hostNameStorage}/${card?.images?.img_profile}` : '/static/media/profile.svg'}} cover={{url: card?.images?.img_cover ? `${hostNameStorage}/${card?.images?.img_cover}` : '/static/media/cover.svg'}} />
      </Box>
      <Flex justify='center' mb='25px' align='center'>
        <Text
          style={{ filter: !props.card.is_active ? 'blur(2px)' : 'none' }}
          color={textColor}
          fontSize='xl'
          fontWeight='700'
          lineHeight='100%'>
          {props.card.title}
        </Text>
      </Flex>

      <Flex justify='space-between' w='100%'>
        {true || props.card.is_active ? <Flex
          direction='column'
          align='center'
          me={{ base: "16px", md: "0px", "2xl": "36px" }}
          onClick={() => {
            history.push(`/u/cards/edit/${props.card.code}`);
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
              <Icon as={MdEdit} color={'green'} w='24px' h='24px' />
            }
          />
          <Text fontSize='sm' fontWeight='500' color={textColor}>
            Edit
          </Text>
        </Flex> : ''}
        {false && !props.card.is_active ? activateCardBtnModal : ''}

        {props.card.is_active ? <Flex direction='column' align='center'>
          <IconButton onClick={onrenameOpen}
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
              <Icon as={MdDriveFileRenameOutline} color={'blue'} w='24px' h='24px' />
            }
          />
          <Text fontSize='sm' fontWeight='500' color={textColor}>
            Rename
          </Text>
        </Flex> : ''}

        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Alert</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Text>Are you sure you want to disable your card visibility?</Text>
            </ModalBody>

            <ModalFooter>
              <Button colorScheme='blue' mr={3} onClick={() => activateCard(false)} isLoading={loading}>
                Yes
              </Button>
              <Button variant='ghost' onClick={onClose}>No</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Flex>

      {props.card.is_active ? <Flex direction='column' align='center'>
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
            Disable
          </Text>
        </Flex> : ''}
        {!props.card.is_active ? <Flex direction='column' align='center'>
          <IconButton onClick={() => activateCard(true)}
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
            Activate
          </Text>
        </Flex> : ''}

      {hasRole('admin') ? <Flex justify='center' w='100%' style={{ borderTop: 'solid gray 1px', marginTop: '10px' }}>
        <Flex direction='column' align='center'>
          <IconButton onClick={onDeleteOpen}
            borderRadius='50%'
            bg={bgIconButton}
            _hover={bgIconHover}
            _active={bgIconFocus}
            _focus={bgIconFocus}
            w='56px'
            h='56px'
            mb='5px'
            boxShadow={shadow}
            icon={<Icon as={MdDeleteForever} color={redIcon} w='24px' h='24px' />}
          />
          <Text fontSize='sm' fontWeight='500' color={textColor}>
            Delete
          </Text>
        </Flex>
      </Flex> : ''}

      <Modal isOpen={isrenameOpen} onClose={onrenameClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Rename card</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel color={'#000000'}>Name</FormLabel>
              <Input focusBorderColor='none' backgroundColor={'#f7f7f7'} placeholder={'Name'} caption={'Name'} value={rename} onChange={(e) => setrename(e.target.value)} />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={renameCard} isLoading={loading}>
              OK
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Modal isOpen={isDeleteOpen} onClose={onDeleteClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Alert</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>Are you sure you want to delete this card permanently?</Text>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={() => deleteCard()} isLoading={loading}>
              Yes
            </Button>
            <Button variant='ghost' onClick={onDeleteClose}>No</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

    </Card>
  ):'';
}
