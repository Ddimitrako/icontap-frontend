
import {
  Box,
  Grid,
  useColorModeValue,
} from "@chakra-ui/react";
// Chakra imports
import {Avatar, Flex, FormLabel, Icon, Image, Select, SimpleGrid, Text} from "@chakra-ui/react";
import Card from "components/card/Card";
import React, {useEffect, useState} from "react";
import SearchTableUsers from "views/admin/main/users/overview/components/SearchTableUsersOverivew";
import { columnsDataUsersOverview } from "views/admin/main/users/overview/variables/columnsDataUsersOverview";
import tableDataUsersOverview from "views/admin/main/users/overview/variables/tableDataUsersOverview.json";
import MiniStatistics from "../../../../../components/card/MiniStatistics";
import IconBox from "../../../../../components/icons/IconBox";
import {MdPerson, MdThumbUp} from "react-icons/md";
import Usa from "../../../../../assets/img/users/usa.png";
import FakeLineGraph from "../../../../../assets/img/users/FakeLineGraph.png";
import AdminStatistics from "./components/Statistics";
import {getAuth, getMe} from "../../../../../Helpers/Auth";
import axios from "axios";
import {hostName} from "../../../../../Helpers/App";

export default function UsersOverview() {
  const [totalActiveUsers,setTotalActiveUsers] = useState(0)
  const [totalCompaniesNum,setTotalCompaniesNum] = useState(0)
  const [currentCompany,setCurrentCompany] = useState("")
  const [currentCompanyUsers,setCurrentCompanyUsers] = useState(0)

  const config = {
        headers: {Authorization: `Bearer ${getAuth()}`}
    };

    function getCompanies() {
        axios.get(
            hostName + '/company',
            config
        ).then((response) => {
                console.log(response)
                if (response.status==200){
                    console.log(response.data.data.length)
                    setCurrentCompany(response.data.data[0].name)
                    setTotalCompaniesNum(response.data.data.length)
                }
                console.log()
            }
        ).catch(console.log);
    }

    useEffect(() => {
        getCompanies()

    }, []);
  return (
    <Flex direction='column' pt={{ sm: "125px", lg: "75px" }}>
      <Card px='0px'>
        <AdminStatistics totalActiveUsers={totalActiveUsers} totalCompaniesNum={totalCompaniesNum} currentCompany={currentCompany} currentCompanyUsers={currentCompanyUsers}/>
        <SearchTableUsers
          tableData={tableDataUsersOverview}
          columnsData={columnsDataUsersOverview}
        />
      </Card>
    </Flex>
  );
}
