import {
    Box, Button,
    Grid,
    useColorModeValue,
} from "@chakra-ui/react";
// Chakra imports
import {Avatar, Flex, FormLabel, Icon, Image, Select, SimpleGrid, Text} from "@chakra-ui/react";
import Card from "components/card/Card";
import React, {useEffect, useState} from "react";
import UsersTable from "views/admin/main/users/adminOverview/components/SearchTableUsersOverivew";
import {columnsDataUsersOverview} from "views/admin/main/users/companyOverview/variables/columnsDataUsersOverview";
import tableDataUsersOverview from "views/admin/main/users/companyOverview/variables/tableDataUsersOverview.json";
import MiniStatistics from "../../../../../components/card/MiniStatistics";
import IconBox from "../../../../../components/icons/IconBox";
import {MdPerson, MdThumbUp} from "react-icons/md";
import Usa from "../../../../../assets/img/users/usa.png";
import FakeLineGraph from "../../../../../assets/img/users/FakeLineGraph.png";
import AdminStatistics from "./components/Statistics";
import {getAuth, getMe} from "../../../../../Helpers/Auth";
import axios from "axios";
import {hostName, redirectRouter} from "../../../../../Helpers/App";
import AdminActionsBtn from "./components/AdminActions";
import { deepCopy } from "Helpers/Arrays";

export default function CompanyUsersOverview(props) {
    const [totalUsers, setTotalUsers] = useState(0)
    const [usersList, setUsersList] = useState([])
    const [totalCompaniesNum, setTotalCompaniesNum] = useState(0)
    const [currentCompany, setCurrentCompany] = useState("")
    const [currentCompanyUsers, setCurrentCompanyUsers] = useState(0)
    const [companyName, setCompanyName] = useState("")
    const [companyDescript, setCompanyDescript] = useState("")
    const [companyLogo, setCompanyLogo] = useState("")
    const [companiesNamesUUIDsList, setCompaniesNamesUUIDsList] = useState([{}])
    const [selectedUsers,setSelectedUsers] = useState([])

    const companyNameChange = (event) => setCompanyName(event.target.value)
    const companyDescrChange = (event) => setCompanyDescript(event.target.value)


    const config = {
        headers: {Authorization: `Bearer ${getAuth()}`}
    };

    //####################################################################################

    function getUsers(currentCompanyUUID ) {
        let url = hostName + '/users';
        if (currentCompanyUUID !=null && currentCompanyUUID !="") {
            url = hostName + '/company/'+ currentCompanyUUID + '/users'
        }
        var usersArray = []
        axios.get(
            url,
            config
        ).then((response) => {
            // && response.data.data.length > 0
            setUsersList([])
            let tempUsers=response.data.data.map((u,i)=>{return {...u, 
                editCard:
                <Button colorScheme='teal' variant='outline' onClick={() => redirectRouter(`/admin/cardsList/card/${u.id}`, { user: deepCopy(u) }, props.history)}>Cards</Button>,
                analytics:
                <Button colorScheme='teal' variant='outline'>Analytics</Button>
            }})
            // console.log(response.data.data)
            setUsersList((usersList) => [...usersList, tempUsers]);
            //check only the first time where is null
            if (currentCompanyUUID == null) {
                setTotalUsers(response.data.data.length)
            }
        }
        ).catch(console.log);
    }

    //First run
    useEffect(() => {
        // getMe().companies[0].uuid
        if (getMe()?.role_company?.code=="admin") {
            getUsers(getMe().companies[0].uuid)
        }
        // console.log(getMe().companies[0].uuid)
        // console.log(getMe())
        setCompanyName(getMe()?.companies[0]?.name)
    }, []);
    //Admin Actions create company BTN pressed



    // useEffect(() => {
    //     console.log(selectedUsers)
    // }, [selectedUsers]);
    return (
        <Flex direction='column' pt={{sm: "125px", lg: "75px"}}>
            <Card px='0px'>
                <AdminStatistics companyName={companyName} companiesList={companiesNamesUUIDsList} totalUsers={totalUsers} totalCompaniesNum={totalCompaniesNum}
                  currentCompany={currentCompany} setCurrentCompany={setCurrentCompany} currentCompanyUsers={currentCompanyUsers}/>
                <Flex
                    align={{sm: "flex-start", lg: "flex-start"}}
                    justify={{sm: "flex-start", lg: "flex-start"}}
                    w='100%'
                    px='22px'
                    mb='36px'>
                    {/*<AdminActionsBtn setCreateCompanyBtn={setCreateCompanyBtn} companyNameChange={companyNameChange}*/}
                    {/*                 companyDescrChange={companyDescrChange} setSelectedUsers={setSelectedUsers} selectedUsers = {selectedUsers}*/}
                    {/*/>*/}
                </Flex>
                <UsersTable
                    testData1={tableDataUsersOverview}
                    testData2={columnsDataUsersOverview}
                    usersList={usersList[0]}
                    selectedUsers = {selectedUsers}
                    setSelectedUsers = {setSelectedUsers}

                />
            </Card>
        </Flex>
    );
}
