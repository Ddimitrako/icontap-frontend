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

export default function AdminActionsBtn({setMyAlert,companiesList,setCreateCompanyBtn, companyNameChange, companyDescrChange,setSelectedUsers,selectedUsers,refreshUsersTable,setRefreshUsersTable}) {

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
    const {
        isOpen: isOpenAssignUserCardModal,
        onOpen: onOpenAssignUserCardModal,
        onClose: onCloseAssignUserCardModal
    } = useDisclosure()
    const {
        isOpen: isOpenMassUserModal,
        onOpen: onOpenMassUserModal,
        onClose: onCloseMassUserModal
    } = useDisclosure()
    const initialRef = React.useRef(null)
    const finalRef = React.useRef(null)
    // Chakra Color Mode


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
    const [cardType, setCardType] = useState(true)
    const [cardTitle, setCardTitle] = useState("My card")

    const [file, setSelectedFile] = useState()

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
    const handleChangeCardTitle= event => {
        setCardTitle(event.target.value);
    }

    const handleFileSelect = (event) => {
        setSelectedFile(event.target.files[0])
      }


    const config = {
        headers: {Authorization: `Bearer ${getAuth()}`}
    };

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
        if (userName==undefined || userLastName==undefined || userEmail==undefined || userPassword==undefined){
             setMyAlert({show:true,message:"One or more values where undefined",status:"error"})
            return
        }
        axios.post(
            hostName + '/user',
            userData,
            config
        ).then((response) => {
                console.log(response)
                if (response.status == 200) {
                    setMyAlert({show:true,message:"User successfully created",status:"success"})
                    setRefreshUsersTable(true)
                }
            }
        ).catch(function (error) {
               setMyAlert({show:true,message:error.response.data.data.email,status:"error"})
            });
        //reset user data
        setUserName()
        setUserLastName()
        setUserEmail()
        setUserPassword()
        setUserRole('2')
        setCompanyUUID()
        setCompanyRole()
    }

    function MassStoreUsers() {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('company_id', (selectedCompany) ? selectedCompany.uuid : '');
        axios.post(
            hostName + '/user/bulk/store',
            formData,
            {
                headers: {
                    Authorization: `Bearer ${getAuth()}`,
                    'Content-Type': 'multipart/form-data'
                }
            }
        ).then((response) => {
                if (response.status == 200) {
                    setMyAlert({show:true,message:"Your request has been uploaded successfully. You will receive an email with the result.",status:"success"})
                    setRefreshUsersTable(true)
                }
            }
        ).catch(function (error) {
                let msg = 'Error uploading file. Try again.';
                if(error.response.data.data === 'Missing headers'){
                    msg = 'Missing or incorrect headers in file';
                }
                if((error.response.data.message) && (error.response.data.message !== '')){
                    msg = 'Error validating file: ' + error.response.data.message;
                }
               setMyAlert({show:true,message:msg,status:"error"})
            });
    }

    function AssignUsers() {
            //console.log("companyRole-->",companyRole)
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
                    //console.log(response)
                    if (response.status == 200) {
                        setMyAlert({show:true,message:"User successfully assigned to "+selectedCompany.name,status:"success"})

                    }
                }
            ).catch(console.log);


    }

    function AssignUserCard() {

        if (selectedUsers[0].company_id!=undefined){
             var obj = {
            "title": cardTitle,
            "is_personal": cardType,
            "owner": selectedUsers[0].user_id,
            "company_id": selectedUsers[0].company_id,
            }
        }
        else {
            var obj = {
            "title": cardTitle,
            "is_personal": cardType,
            "owner": selectedUsers[0].user_id,
            }
        }


        axios.post(
            hostName + '/card/',
            obj,
            config
        ).then((response) => {
                console.log(response)
                if (response.status == 200) {
                    setMyAlert({
                        show: true,
                        message: "A new card successfully assigned to selected user ",
                        status: "success"
                    })
                    axios.post(
                        hostName + '/card/'+response.data.data.code+'/profile',
                        config
                    ).catch((err)=>{console.log(err.response)})
                }
            }
        ).catch(console.log);
    }

    // useEffect(() => {
    //     getCompanies()
    // }, []);

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
             <Modal id='assignUserCard'

                   isOpen={isOpenAssignUserCardModal}
                   onClose={onCloseAssignUserCardModal}
            >
                <ModalOverlay/>
                <ModalContent>
                    <ModalHeader>Assign card to selected user</ModalHeader>
                    <ModalCloseButton/>
                    <ModalBody pb={6}>
                        <FormControl mt={4}>
                            <FormLabel>Type Card title</FormLabel>
                             <Input ref={initialRef} placeholder='Card title'
                                   onChange={handleChangeCardTitle}/>
                        </FormControl>
                        <FormControl mt={4}>
                            <FormLabel>Select Card Type</FormLabel>
                            <Select defaultValue='true'
                            onChange={(e) => {
                                console.log(e.target.value)
                                if (e.target.value=="true"){setCardType(true)}
                                else{setCardType(false)}

                            }}>
                                <option value="true">personal</option>
                                <option value="false">business</option>
                            </Select>
                        </FormControl>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={(e)=>{
                                if (cardType===undefined) {
                                    alert("Please select a card type");
                                }else {
                                    onCloseAssignUserCardModal()
                                    AssignUserCard()
                                }

                        }}>
                            Assign
                        </Button>
                        <Button onClick={onCloseAssignUserCardModal}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>


            </Modal>
            <Modal id='massUser'
                   initialFocusRef={initialRef}
                   finalFocusRef={finalRef}
                   isOpen={isOpenMassUserModal}
                   onClose={onCloseMassUserModal}
            >
                <ModalOverlay/>
                <ModalContent>
                    <ModalHeader>Mass store users</ModalHeader>
                    <ModalCloseButton/>
                    <ModalBody pb={6}>
                        <FormControl mt={4}>
                            <FormLabel>Select Company (optional)</FormLabel>
                            <Select id='company' onChange={(e) => {
                                setSelectedCompany({
                                    name: companiesList[e.target.value].name,
                                    uuid: companiesList[e.target.value].uuid
                                })
                            }}>
                                <option value=''> None</option>
                                {listCompanies}
                            </Select>
                        </FormControl>
                        <FormControl mt={4}>
                            <FormLabel>Select file (xls, csv)</FormLabel>
                            <input accept=".xls,.xlsx,.csv" type="file" name="file" id="file" onChange={handleFileSelect} />
                        </FormControl>
                    </ModalBody>

                    <ModalFooter>
                        <Button onClick={() => {
                            if (file === undefined){
                                alert("Please select a file");
                            } else {
                                MassStoreUsers()
                                onCloseMassUserModal()
                            }
                        }} colorScheme='blue' mr={3}>
                            Upload
                        </Button>
                        <Button onClick={onCloseMassUserModal}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
                </Modal>

            <Menu>
                <MenuButton as={Button} className='btn-custom-dark-background' rightIcon={<ChevronDownIcon/>}>
                ⚙️ Admin Actions
                </MenuButton>
                <MenuList>
                    <MenuItem onClick={onOpenCompanyModal}>Create company</MenuItem>
                    <MenuItem onClick={onOpenUserModal}>Create user/s</MenuItem>
                    <MenuItem>Deactivate selected user/s</MenuItem>
                    <MenuItem onClick={()=>{
                         if (selectedUsers.length==0 || selectedUsers.length>1){
                            alert("Please select one user only");
                        }else
                        onOpenAssignUserCardModal()
                    }} > Assign card to selected user/s</MenuItem>
                    <MenuItem onClick={()=>{
                        if (selectedUsers.length==0){
                            alert("Please select one or more users");
                        }else
                        onOpenAssignUserModal()
                    }}>Assign user/s to company</MenuItem>
                    <MenuItem onClick={onOpenMassUserModal}>Mass users store</MenuItem>
                </MenuList>
            </Menu>
        </div>
    );
}
