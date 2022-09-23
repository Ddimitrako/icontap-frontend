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
    useColorModeValue
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

import {getAuth} from "../../../../../../Helpers/Auth";
import {Switch} from '@chakra-ui/react'
import axios from "axios";
import {hostName} from "../../../../../../Helpers/App";

export default function AdminActionsBtn({setCreateCompanyBtn, companyNameChange, companyDescrChange,setSelectedUsers,selectedUsers}) {

    const {
        isOpen: isOpenCompanyModal,
        onOpen: onOpenCompanyModal,
        onClose: onCloseCompanyModal
    } = useDisclosure()
    const {
        isOpen: isOpenUserModal,
        onOpen: onOpenUserModal,
        onClose: onCloseUserModal
    } = useDisclosure()
    const {
        isOpen: isOpenReportModal,
        onOpen: onOpenReportModal,
        onClose: onCloseReportModal
    } = useDisclosure()
    const {
        isOpen: isOpenAssignUserModal,
        onOpen: onOpenAssignUserModal,
        onClose: onCloseAssignUserModal
    } = useDisclosure()
    const initialRef = React.useRef(null)
    const finalRef = React.useRef(null)
    // Chakra Color Mode

    const [companiesList, setCompaniesList] = useState([{}])
    const [selectedCompany, setSelectedCompany] = useState()
    const listCompanies = companiesList.map((option, index) => (
        <option key={index} value={index}>
            {option.name}
        </option>
    ));

    const [userName, setUserName] = useState()
    const [userLastName, setUserLastName] = useState()
    const [userEmail, setUserEmail] = useState()
    const [userPassword, setUserPassword] = useState()
    const [userRole, setUserRole] = useState('2')
    const [companyUUID, setCompanyUUID] = useState()
    const [companyRole, setCompanyRole] = useState('2')

    const [compAssCheck, setCompAssCheck] = useState(false);

    const handleChangeName = event => {
        setUserName(event.target.value);
    }
    const handleChangeLastName = event => {
        setUserLastName(event.target.value);
    }
    const handleChangeEmail = event => {
        setUserEmail(event.target.value);
    }
    const handleChangePassword = event => {
        setUserPassword(event.target.value);
    }

    const config = {
        headers: {Authorization: `Bearer ${getAuth()}`}
    };

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
                    //create a list with all companies names and UUID
                    //etc companiesNamesUUIDs = [{"tesla","434-343-343"}]
                    for (let i = 0; i < response.data.data.length; i++) {
                        let companyObj = {};
                        companyObj['name'] = response.data.data[i].name;
                        companyObj['uuid'] = response.data.data[i].uuid;
                        companiesNamesUUIDs.push(companyObj);

                    }
                    setCompaniesList(companiesNamesUUIDs)

                }
            }
        ).catch(console.log);
    }

    const userDataCompany =
        {
            "name": userName,
            "last_name": userLastName,
            "email": userEmail,
            "password": userPassword,
            "c_password": userPassword,
            "role_id": userRole,
            "company_id": companyUUID,
            "company_role_id": companyRole
        }
    const userDataSimple =
        {
            "name": userName,
            "last_name": userLastName,
            "email": userEmail,
            "password": userPassword,
            "c_password": userPassword,
            "role_id": userRole,
        }
    var userData = userDataSimple

    useEffect(() => {
        if (compAssCheck == true) {
            userData = userDataCompany
        } else {
            userData = userDataSimple
        }
    }, [compAssCheck]);

    function CreateUser() {
        console.log(userData)

        axios.post(
            hostName + '/user',
            userData,
            config
        ).then((response) => {
                console.log(response)
                if (response.status == 200) {
                    ///Todo//Show green alert when a user is created.
                }
            }
        ).catch(console.log);
    }

    function AssignUsers() {
            console.log("companyRole-->",companyRole)
            let userslist = []
            for (var key in selectedUsers) {
                selectedUsers[key].company_role_id = companyRole
                userslist.push(selectedUsers[key])
            }
            var obj = {"users": userslist}
            setSelectedUsers(obj)

            axios.post(
                hostName + '/company/' + selectedCompany.uuid + '/users',
                obj,
                config
            ).then((response) => {
                    console.log(response)
                    if (response.status == 200) {
                        ///Todo//Show green alert when a user is assigned.
                    }
                }
            ).catch(console.log);


    }

    useEffect(() => {
        getCompanies()
    }, []);

    useEffect(() => {
        console.log(selectedUsers)
    }, [selectedUsers]);

    return (
        <div style={{zIndex:2}}>
            <Modal id='createCompany'
                   initialFocusRef={initialRef}
                   finalFocusRef={finalRef}
                   isOpen={isOpenCompanyModal}
                   onClose={onCloseCompanyModal}
            >
                <ModalOverlay/>
                <ModalContent>
                    <ModalHeader>Create Company</ModalHeader>
                    <ModalCloseButton/>
                    <ModalBody pb={6}>
                        <FormControl>
                            <FormLabel>Company Name</FormLabel>
                            <Input ref={initialRef} placeholder='Company Name'
                                   onChange={companyNameChange}/>
                        </FormControl>

                        <FormControl mt={4}>
                            <FormLabel>Description</FormLabel>
                            <Input defaultValue="" placeholder='Description' onChange={companyDescrChange}/>
                        </FormControl>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3}
                                onClick={(event) => {
                                    onCloseCompanyModal()
                                    setCreateCompanyBtn(true)
                                }}>
                            Create
                        </Button>
                        <Button onClick={(event) => {
                            onCloseCompanyModal()
                        }}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>


            <Modal id='createUser'
                   initialFocusRef={initialRef}
                   finalFocusRef={finalRef}
                   isOpen={isOpenUserModal}
                   onClose={onCloseUserModal}
            >
                <ModalOverlay/>
                <ModalContent>
                    <ModalHeader>Create User</ModalHeader>
                    <ModalCloseButton/>
                    <ModalBody pb={6}>
                        <FormControl>
                            <FormLabel>User Name</FormLabel>
                            <Input ref={initialRef} placeholder='User Name' onChange={handleChangeName}/>
                        </FormControl>
                        <FormControl>
                            <FormLabel>User last Name</FormLabel>
                            <Input ref={initialRef} placeholder='User Last Name' onChange={handleChangeLastName}/>
                        </FormControl>
                        <FormControl>
                            <FormLabel>Password</FormLabel>
                            <Input ref={initialRef} placeholder='Password' onChange={handleChangePassword}/>
                        </FormControl>
                        <FormControl>
                            <FormLabel>Email</FormLabel>
                            <Input ref={initialRef} placeholder='Email' onChange={handleChangeEmail}/>
                        </FormControl>
                        <FormControl>
                            <FormLabel>User Type</FormLabel>
                            <Select value={userRole} onChange={(e) => {
                                setUserRole(e.target.value)
                            }}>
                                <option value='2'>user</option>
                                <option value='1'>admin</option>
                            </Select>
                        </FormControl>
                        <FormControl display='flex' alignItems='center'>
                            <FormLabel htmlFor='email-alerts' mb='0'>
                                Enable Company assign
                            </FormLabel>
                            <Switch id='enable-comp-ass' value={compAssCheck} isChecked={compAssCheck}
                                    onChange={(e) => {
                                        setCompAssCheck(compAssCheck => !compAssCheck)
                                    }}/>
                        </FormControl>
                        <FormControl mt={4}>

                            <FormLabel>Select Company to Asign User</FormLabel>

                            <Select onChange={(e) => {
                                setSelectedCompany({
                                    name: companiesList[e.target.value].name,
                                    uuid: companiesList[e.target.value].uuid
                                })
                            }}
                                    id='company'
                            >
                                <option value='None'> None</option>
                                {listCompanies}
                            </Select>
                        </FormControl>
                        <FormControl mt={4}>
                            <FormLabel>Select Company User Type</FormLabel>
                            <Select defaultValue={companyRole} onChange={(e) => {
                                setCompanyRole(e.target.value)
                            }}>
                                <option value='2'>user</option>
                                <option value='1'>admin</option>
                            </Select>
                        </FormControl>
                    </ModalBody>

                    <ModalFooter>
                        <Button onClick={() => {

                            CreateUser()
                            onCloseUserModal()
                        }} colorScheme='blue' mr={3}>
                            Create
                        </Button>
                        <Button onClick={onCloseUserModal}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>


            </Modal>
            <Modal id='assignUser'

                   isOpen={isOpenAssignUserModal}
                   onClose={onCloseAssignUserModal}
            >
                <ModalOverlay/>
                <ModalContent>
                    <ModalHeader>Assign user/s to company</ModalHeader>
                    <ModalCloseButton/>
                    <ModalBody pb={6}>
                        <FormControl mt={4}>
                            <FormLabel>Select Company to Assign User</FormLabel>
                            <Select onChange={(e) => {
                                console.log(companiesList[e.target.value].name)
                                setSelectedCompany({
                                    name: companiesList[e.target.value].name,
                                    uuid: companiesList[e.target.value].uuid
                                }

                                )
                            }}
                                    id='company'
                            >   <option value='None'>None</option>
                                {listCompanies}
                            </Select>
                        </FormControl>
                        <FormControl mt={4}>
                            <FormLabel>Select Company User Type</FormLabel>
                            <Select defaultValue='2'
                            onChange={(e) => {
                                console.log(e.target.value)
                                setCompanyRole(e.target.value)
                            }}>
                                <option value='2'>user</option>
                                <option value='1'>admin</option>
                            </Select>
                        </FormControl>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={(e)=>{
                                if (selectedCompany===undefined) {
                                    alert("Please select a company");
                                }else {
                                    onCloseAssignUserModal()
                                    AssignUsers()
                                }

                        }}>
                            Assign
                        </Button>
                        <Button onClick={onCloseAssignUserModal}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>


            </Modal>
            <Menu>
                <MenuButton as={Button} colorScheme='purple' rightIcon={<ChevronDownIcon/>}>
                    Admin Actions
                </MenuButton>
                <MenuList>
                    <MenuItem onClick={onOpenCompanyModal}>Create company</MenuItem>
                    <MenuItem onClick={onOpenUserModal}>Create user/s</MenuItem>
                    <MenuItem>Deactivate selected user/s</MenuItem>
                    <MenuItem>Assign card to selected user/s</MenuItem>
                    <MenuItem onClick={()=>{
                        if (selectedUsers.length==0){
                            alert("Please select one or more users");
                        }else
                        onOpenAssignUserModal()
                    }}>Assign user/s to company</MenuItem>
                </MenuList>
            </Menu>
        </div>
    );
}
