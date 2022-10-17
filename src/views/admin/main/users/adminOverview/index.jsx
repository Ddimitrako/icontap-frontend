import {
    Alert,
    AlertDescription,
    AlertIcon,
    Box, Button,
    Grid,
    useColorModeValue,
} from "@chakra-ui/react";
// Chakra imports
import { Avatar, Flex, FormLabel, Icon, Image, Select, SimpleGrid, Text } from "@chakra-ui/react";
import Card from "components/card/Card";
import React, { useEffect, useState } from "react";
import UsersTable from "views/admin/main/users/adminOverview/components/SearchTableUsersOverivew";
import { columnsDataUsersOverview } from "views/admin/main/users/adminOverview/variables/columnsDataUsersOverview";
import tableDataUsersOverview from "views/admin/main/users/adminOverview/variables/tableDataUsersOverview.json";
import MiniStatistics from "../../../../../components/card/MiniStatistics";
import IconBox from "../../../../../components/icons/IconBox";
import { MdPerson, MdThumbUp } from "react-icons/md";
import Usa from "../../../../../assets/img/users/usa.png";
import FakeLineGraph from "../../../../../assets/img/users/FakeLineGraph.png";
import AdminStatistics from "./components/Statistics";
import { getAuth, getMe } from "../../../../../Helpers/Auth";
import axios from "axios";
import { hostName } from "../../../../../Helpers/App";
import AdminActionsBtn from "./components/AdminActions";
import { deepCopy } from "Helpers/Arrays";

export default function AdminUsersOverview(props) {
    const [totalUsers, setTotalUsers] = useState(0)
    const [usersList, setUsersList] = useState([])

    const [totalCompaniesNum, setTotalCompaniesNum] = useState(0)
    const [currentCompany, setCurrentCompany] = useState("")
    const [currentCompanyUsers, setCurrentCompanyUsers] = useState(0)
    const [companyName, setCompanyName] = useState("")
    const [companyDescript, setCompanyDescript] = useState("none")
    const [companyLogo, setCompanyLogo] = useState("")
    const [createCompanyBtn, setCreateCompanyBtn] = useState(false)
    const [companiesNamesUUIDsList, setCompaniesNamesUUIDsList] = useState([{}])
    const [selectedUsers, setSelectedUsers] = useState([])

    // const [showAlert, setShowAlert] = useState(false)
    // const [alertMessage, setMyAlertMessage] = useState("")
    const [myAlert, setMyAlert] = useState({ show: false, message: "", status: "success" })
    const [refreshUsersTable, setRefreshUsersTable] = useState(false)
    //     const usersList2 = [
    //     {
    //         id: 1,
    //         username: 'Vlad Mihalache',
    //         email: 'vald@emaai.com',
    //         company:"moderna",
    //         joinDate:"14-1-1994",
    //         userType:"User"
    //     },
    //     {
    //         id: 2,
    //         username: 'Itoudis',
    //         email: 'vald@emaai.com',
    //         company:"moderna",
    //         joinDate:"13-1-1994",
    //         userType:"User"
    //     },
    //     {
    //         id: 3,
    //         username: 'Lostas kala',
    //         email: 'vald@emaai.com',
    //         company:"moderna",
    //         joinDate:"10-1-1993",
    //         userType:"User"
    //     },
    //     {
    //         id: 4,
    //         username: 'VDimitris Vlad',
    //         email: 'vald@emaai.com',
    //         company: "moderna",
    //         joinDate: "1-1-1994",
    //         userType: "User"
    //     }
    //
    //
    // ]
    const companyNameChange = (event) => setCompanyName(event.target.value)
    const companyDescrChange = (event) => setCompanyDescript(event.target.value)


    const config = {
        headers: { Authorization: `Bearer ${getAuth()}` }
    };

    //####################################################################################
    function getCompanies() {
        axios.get(
            hostName + '/company',
            config
        ).then((response) => {
            // console.log(response)
            let companiesNamesUUIDs = []
            if (response.status == 200 && response.data.data.length > 0) {
                // console.log(response.data.data)
                // setCurrentCompany(response.data.data[0].name)
                setTotalCompaniesNum(response.data.data.length)

                //create a list with all companies names and UUID
                //etc companiesNamesUUIDs = [{"tesla","434-343-343"}]
                for (let i = 0; i < response.data.data.length; i++) {
                    let companyObj = {};
                    companyObj['name'] = response.data.data[i].name;
                    companyObj['uuid'] = response.data.data[i].uuid;
                    companyObj['users_count'] = response.data.data[i].users_count;
                    companiesNamesUUIDs.push(companyObj);

                }
                setCompaniesNamesUUIDsList(companiesNamesUUIDs)

            }
        }
        ).catch(console.log);
    }


    //############################################################################################

    const companyInfo =
    {
        "name": companyName,
        "description": companyDescript,
        // "logo": companyLogo
    }

    function CreateCompany() {
        //TODO check if company already exists
        axios.post(
            hostName + '/company',
            companyInfo,
            config
        ).then((response) => {
            console.log(response)
            if (response.status == 200) {
                setMyAlert({ show: true, message: "Company created successfully", status: "success" })
                getCompanies()
            }
            else {
                setMyAlert({ show: true, message: "Company could not be created", status: "error" })
            }

        }
        ).catch(console.log);
    }

    //###############################################################################################

    function redirectRouter(url, state, history) {
        console.log(url, state);
        history.push({
            pathname:url,
            state: state
        });
    }

    function getUsers(currentCompanyUUID = null) {
        let url = hostName + '/users';
        if (currentCompanyUUID != null && currentCompanyUUID != "") {
            url = hostName + '/company/' + currentCompanyUUID + '/users'
        }
        var usersArray = []
        axios.get(
            url,
            config
        ).then((response) => {
            setUsersList([])
            console.log('response', response);
            let tempUsers=response.data.data.map((u,i)=>{return {...u, 
                editCard:
                <Button colorScheme='teal' variant='outline' onClick={() => redirectRouter(`/u/cardsList/card/${u.id}`, { user: deepCopy(u) }, props.history)}>Cards</Button>,
                analytics:
                <Button colorScheme='teal' variant='outline'>Analytics</Button>
            }})

            console.log(response.data.data);
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
        getCompanies()
        getUsers()

    }, []);

    useEffect(() => {
        if (refreshUsersTable == true) {
            setRefreshUsersTable(false)
            getUsers()
        }
    }, [refreshUsersTable]);

    //Admin Actions create company BTN pressed
    useEffect(() => {
        if (createCompanyBtn === true) {
            console.log(companyName)
            if (companyName != "") {
                CreateCompany()
            } else {
                window.alert("Company name is missing")
            }
            setCreateCompanyBtn(false)
            setCompanyName("")
            setCompanyDescript("none")
        }
    }, [createCompanyBtn]);

    useEffect(() => {
        // console.log("currentCompany-->"+currentCompany.name)
        // console.log("currentCompany UUID-->"+currentCompany.uuid)
        getUsers(currentCompany.uuid);
    }, [currentCompany]);

    useEffect(() => {
        const timeId = setTimeout(() => {
            // After 3 seconds set the show value to false
            setMyAlert({ show: false })
        }, 3000)
        return () => {
            clearTimeout(timeId)
        }
    }, [myAlert.show]);


    return (
        <Flex direction='column' pt={{ sm: "125px", lg: "75px" }}>
            <Card px='0px'>
                {myAlert.show && <Alert status={myAlert.status}>
                    <AlertIcon></AlertIcon>
                    <AlertDescription>{myAlert.message}</AlertDescription>
                </Alert>}
                <AdminStatistics companiesList={companiesNamesUUIDsList} totalUsers={totalUsers}
                    totalCompaniesNum={totalCompaniesNum}
                    currentCompany={currentCompany} setCurrentCompany={setCurrentCompany}
                    currentCompanyUsers={currentCompanyUsers} />
                <Flex
                    align={{ sm: "flex-start", lg: "flex-start" }}
                    justify={{ sm: "flex-start", lg: "flex-start" }}
                    w='100%'
                    px='22px'
                    mb='36px'>
                    <AdminActionsBtn companiesList={companiesNamesUUIDsList} setCompaniesNamesUUIDsList={setCompaniesNamesUUIDsList} setCreateCompanyBtn={setCreateCompanyBtn} companyNameChange={companyNameChange}
                        companyDescrChange={companyDescrChange} setSelectedUsers={setSelectedUsers} selectedUsers={selectedUsers}
                        setMyAlert={setMyAlert}
                        refreshUsersTable={refreshUsersTable}
                        setRefreshUsersTable={setRefreshUsersTable}
                    />
                </Flex>
                <UsersTable
                    testData1={tableDataUsersOverview}
                    testData2={columnsDataUsersOverview}
                    usersList={usersList[0]}
                    selectedUsers={selectedUsers}
                    setSelectedUsers={setSelectedUsers}
                />
            </Card>
        </Flex>
    );
}
