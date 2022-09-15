// Chakra imports
import {
    Select,
    Box,
    useDisclosure,
    Button,
    Flex,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    Text,
    SimpleGrid,
    useColorModeValue, Icon, Avatar, Image
} from "@chakra-ui/react";
import React from "react";
import {ChevronDownIcon} from "@chakra-ui/icons";
import {
    Modal, FormControl,
    ModalOverlay, FormLabel, Input,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
} from '@chakra-ui/react';
import MiniStatistics from "../../../../../../components/card/MiniStatistics";
import IconBox from "../../../../../../components/icons/IconBox";
import {MdPerson} from "react-icons/md";
import Usa from "../../../../../../assets/img/users/usa.png";
import FakeLineGraph from "../../../../../../assets/img/users/FakeLineGraph.png";


export default function AdminStatistics(props) {

    const textColorSecondary = "secondaryGray.600";
    const brandColor = useColorModeValue("brand.500", "white");
    const boxBg = useColorModeValue("secondaryGray.300", "whiteAlpha.100");

    return (
        <SimpleGrid columns={{ base: 1, md: 2, xl: 4 }} gap='20px' mb='20px'>
        <MiniStatistics
            startContent={
                <IconBox
                    w='56px'
                    h='56px'
                    bg={boxBg}
                    icon={<Icon w='32px' h='32px' as={MdPerson} color={brandColor}/>}
                />
            }
            name='Total Active Users'
            value='25'
        />
        <MiniStatistics
            endContent={
                <Text
                    color={textColorSecondary}
                    fontWeight='500'
                    fontSize={{
                        base: "xs",
                    }}
                    me='10px'
                    mt='4px'>
                    6 May - 7 May
                </Text>
            }
            name='Total Companies Number'
            value='17'
        />
        <MiniStatistics
            endContent={
                <Flex me='-16px'>
                    <FormLabel htmlFor='company'>
                        <Avatar src={Usa}/>
                    </FormLabel>
                    <Select
                        id='company'
                        variant='mini'
                        mt='5px'
                        me='0px'
                        defaultValue='usa'>
                        <option value='usa'>USA</option>
                        <option value='uk'>UK</option>
                        <option value='fra'>FRA</option>
                    </Select>
                </Flex>
            }
            name='Current Company'
            value='Moderna'
        />
        <MiniStatistics
            startContent={
                <IconBox
                    w='56px'
                    h='56px'
                    bg='linear-gradient(90deg, #4481EB 0%, #04BEFE 100%)'
                    icon={<Icon w='28px' h='28px' as={MdPerson} color='white'/>}
                />
            }
            endContent={<Image src={FakeLineGraph}/>}
            name='Current Company Users'
            value='9'
        />
        </SimpleGrid>
)
}
