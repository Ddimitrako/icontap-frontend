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
import React, {useEffect, useState} from "react";
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
import companies from "../../../../../../assets/img/users/companies.png";
import FakeLineGraph from "../../../../../../assets/img/users/FakeLineGraph.png";


export default function AdminStatistics({   companyName,
                                            companiesList,
                                            totalUsers,
                                            totalCompaniesNum,
                                            currentCompany,
                                            setCurrentCompany,
                                            currentCompanyUsers
                                        }) {

    const textColorSecondary = "secondaryGray.600";
    const brandColor = useColorModeValue("brand.500", "white");
    const boxBg = useColorModeValue("secondaryGray.300", "whiteAlpha.100");
    const listCompanies = companiesList.map((option, index) => (
                                <option key={index}value={index}>
                                    {option.name}
                                </option>
                            ));

    useEffect(() => {
        // console.log(companiesList)
    }, [companiesList]);
    return (
        <SimpleGrid columns={{base: 1, md: 2, xl: 4}} gap='20px' mb='20px'>
            {/*<MiniStatistics key='1'*/}
            {/*    startContent={*/}
            {/*        <IconBox*/}
            {/*            w='56px'*/}
            {/*            h='56px'*/}
            {/*            bg={boxBg}*/}
            {/*            icon={<Icon w='32px' h='32px' as={MdPerson} color={brandColor}/>}*/}
            {/*        />*/}
            {/*    }*/}
            {/*    name='Total  Users'*/}
            {/*    value={totalUsers}*/}
            {/*/>*/}

            <MiniStatistics key='3'
                            endContent={
                                <Flex me='-16px'>
                                    {companyName}
                                    <FormLabel htmlFor='company'>

                                        <Avatar src={companies}/>
                                    </FormLabel>

                                </Flex>
                            }
            />

        </SimpleGrid>
    )
}
