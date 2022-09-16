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
import React, {useEffect} from "react";
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


export default function AdminActionsBtn({setCreateCompanyBtn,companyNameChange,companyDescrChange}) {

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

    const initialRef = React.useRef(null)
    const finalRef = React.useRef(null)
    // Chakra Color Mode

    return (
        <>
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
                            <Input placeholder='Description' onChange={companyDescrChange}/>
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


            <Modal id='createCompany'
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
                            <Input ref={initialRef} placeholder='User Name'/>
                        </FormControl>

                        <FormControl mt={4}>
                            <FormLabel>Select Company to Asign User</FormLabel>
                            <Select>
                                <option value='None'>None</option>
                                <option value='Company1'>Company 1</option>
                                <option value='Company2'>Company 2</option>
                                <option value='Company3'>Company 3</option>
                            </Select>
                        </FormControl>
                        <FormControl mt={4}>
                            <FormLabel>Select User Type</FormLabel>
                            <Select>
                                <option value='user'>user</option>
                                <option value='admin'>admin</option>
                            </Select>
                        </FormControl>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3}>
                            Create
                        </Button>
                        <Button onClick={onCloseUserModal}>Cancel</Button>
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

                </MenuList>
            </Menu>
        </>
    );
}
