import React, { useState } from "react";

import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
} from "@chakra-ui/react"

import './EditCardModal.css';
import AddContent from "./AddContent";
import EditLink from "./EditLink";
import EditProfileAddContent from "./EditProfileAddContent";

//The container modal

export default function EditCardModal(props) {
    
    const [page, setPage]=useState('EditProfileAddContent');

    const pages={
        'EditProfileAddContent':<EditProfileAddContent {...props} setPage={setPage} />,
        'EditLink':<EditLink {...props} setPage={setPage} />
    }

    return <Modal size={'xl'} style={{maxWidth:'1000px'}} isOpen={props.isOpen} onClose={props.onClose} isCentered>
        <ModalOverlay
            bg='blackAlpha.300'
            backdropFilter='blur(10px) hue-rotate(90deg)'
        />
        {pages[page]}    
    </Modal>
}
