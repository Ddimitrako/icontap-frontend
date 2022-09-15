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
import AdminStatistics from "./components/Statistics";


export default function UsersOverview() {
  return (
    <Flex direction='column' pt={{ sm: "125px", lg: "75px" }}>
      <Card px='0px'>
        <AdminStatistics/>
        <SearchTableUsers
          tableData={tableDataUsersOverview}
          columnsData={columnsDataUsersOverview}
        />
      </Card>
    </Flex>
  );
}
