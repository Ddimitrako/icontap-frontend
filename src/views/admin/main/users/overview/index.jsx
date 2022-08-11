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

import {
  Box,
  Grid,
  useColorModeValue,
} from "@chakra-ui/react";
// Chakra imports
import {Avatar, Flex, FormLabel, Icon, Image, Select, SimpleGrid, Text} from "@chakra-ui/react";
import Card from "components/card/Card";
import React from "react";
import SearchTableUsers from "views/admin/main/users/overview/components/SearchTableUsersOverivew";
import { columnsDataUsersOverview } from "views/admin/main/users/overview/variables/columnsDataUsersOverview";
import tableDataUsersOverview from "views/admin/main/users/overview/variables/tableDataUsersOverview.json";
import MiniStatistics from "../../../../../components/card/MiniStatistics";
import IconBox from "../../../../../components/icons/IconBox";
import {MdPerson, MdThumbUp} from "react-icons/md";
import Usa from "../../../../../assets/img/users/usa.png";
import FakeLineGraph from "../../../../../assets/img/users/FakeLineGraph.png";



export default function UsersOverview() {
  const textColorSecondary = "secondaryGray.600";
  const brandColor = useColorModeValue("brand.500", "white");
  const boxBg = useColorModeValue("secondaryGray.300", "whiteAlpha.100");
  return (
    <Flex direction='column' pt={{ sm: "125px", lg: "75px" }}>
      <Card px='0px'>
          <SimpleGrid columns={{ base: 1, md: 2, xl: 4 }} gap='20px' mb='20px'>
        <MiniStatistics
          startContent={
            <IconBox
              w='56px'
              h='56px'
              bg={boxBg}
              icon={<Icon w='32px' h='32px' as={MdPerson} color={brandColor} />}
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
          name='Click Events'
          value='1753'
        />
        <MiniStatistics
          endContent={
            <Flex me='-16px'>
              <FormLabel htmlFor='company'>
                <Avatar src={Usa} />
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
          name='Company'
          value='Moderna'
        />
        <MiniStatistics
          startContent={
            <IconBox
              w='56px'
              h='56px'
              bg='linear-gradient(90deg, #4481EB 0%, #04BEFE 100%)'
              icon={<Icon w='28px' h='28px' as={MdThumbUp} color='white' />}
            />
          }
          endContent={<Image src={FakeLineGraph} />}
          name='Likes'
          value='154'
        />
      </SimpleGrid>
        <SearchTableUsers
          tableData={tableDataUsersOverview}
          columnsData={columnsDataUsersOverview}
        />
      </Card>
    </Flex>
  );
}
