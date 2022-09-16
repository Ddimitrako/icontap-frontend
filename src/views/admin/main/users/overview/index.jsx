import {
    Box,
    Grid,
    useColorModeValue,
} from "@chakra-ui/react";
// Chakra imports
import {Avatar, Flex, FormLabel, Icon, Image, Select, SimpleGrid, Text} from "@chakra-ui/react";
import Card from "components/card/Card";
import React, {useEffect, useState} from "react";
import UsersTable from "views/admin/main/users/overview/components/SearchTableUsersOverivew";
import {columnsDataUsersOverview} from "views/admin/main/users/overview/variables/columnsDataUsersOverview";
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
import AdminActionsBtn from "./components/AdminActions";

export default function UsersOverview() {
    const [totalActiveUsers, setTotalActiveUsers] = useState(0)
    const [totalCompaniesNum, setTotalCompaniesNum] = useState(0)
    const [currentCompany, setCurrentCompany] = useState("")
    const [currentCompanyUsers, setCurrentCompanyUsers] = useState(0)
    const [companyName, setCompanyName] = useState("")
    const [companyDescript, setCompanyDescript] = useState("")
    const [companyLogo, setCompanyLogo] = useState("")
    const [createCompanyBtn,setCreateCompanyBtn] = useState(false)

    const companyNameChange = (event) => setCompanyName(event.target.value)
    const companyDescrChange = (event) => setCompanyDescript(event.target.value)


    const config = {
        headers: {Authorization: `Bearer ${getAuth()}`}
    };

    function getCompanies() {
        axios.get(
            hostName + '/company',
            config
        ).then((response) => {
                console.log(response)
                if (response.status == 200 && response.data.data.length > 0) {
                    console.log(response.data.data.length)
                    setCurrentCompany(response.data.data[0].name)
                    setTotalCompaniesNum(response.data.data.length)
                }
            }
        ).catch(console.log);
    }

    const companyInfo =
        {
            "name": companyName,
            "description": companyDescript,
            // "logo": companyLogo
        }


    function CreateCompany() {
        axios.post(
            hostName + '/company',
             companyInfo,
                config
        ).then((response) => {
                console.log(response)
                if (response.status == 200) {
                    //Show green alert.
                }
            }
        ).catch(console.log);
    }

    useEffect(() => {
        getCompanies()

    }, []);

    useEffect(() => {
        if (createCompanyBtn === true) {
            console.log("companyName-->" + companyName)
            console.log("companyDescr-->" + companyDescript)
            CreateCompany()
            setCreateCompanyBtn(false)
        }
    }, [createCompanyBtn]);
    return (
        <Flex direction='column' pt={{sm: "125px", lg: "75px"}}>
            <Card px='0px'>
                <AdminStatistics totalActiveUsers={totalActiveUsers} totalCompaniesNum={totalCompaniesNum}
                                 currentCompany={currentCompany} currentCompanyUsers={currentCompanyUsers}/>
                <Flex
                    align={{sm: "flex-start", lg: "flex-start"}}
                    justify={{sm: "flex-start", lg: "flex-start"}}
                    w='100%'
                    px='22px'
                    mb='36px'>
                    <AdminActionsBtn setCreateCompanyBtn={setCreateCompanyBtn} companyNameChange={companyNameChange} companyDescrChange={companyDescrChange}
                    />
                </Flex>
                <UsersTable
                    testData1={tableDataUsersOverview}
                    testData2={columnsDataUsersOverview}

                />
            </Card>
        </Flex>
    );
}
