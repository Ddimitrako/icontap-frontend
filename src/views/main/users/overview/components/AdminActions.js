// Chakra imports
import {Select,
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
import React from "react";
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


export default function AdminActionsBtn(props) {
    const {...rest} = props;
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
                            <Input ref={initialRef} placeholder='Company Name'/>
                        </FormControl>

                        <FormControl mt={4}>
                            <FormLabel>test</FormLabel>
                            <Input placeholder='test'/>
                        </FormControl>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3}>
                            Create
                        </Button>
                        <Button onClick={onCloseCompanyModal}>Cancel</Button>
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
                            <Select placeholder='Select Company to Asign User'>
                                <option value='None'>None</option>
                                <option value='Company1'>Company 1</option>
                                <option value='Company2'>Company 2</option>
                                <option value='Company3'>Company 3</option>
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
                    <MenuItem>Delete selected user/s</MenuItem>
                    <MenuItem>Assign card to selected user/s</MenuItem>

                </MenuList>
            </Menu>
        </>
    );
}
