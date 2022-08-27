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
import EditProfile from "./EditProfile";

//The container modal

export default function EditProfileAddContent(props) {
    return <ModalContent style={{
        padding: '48px 45px 12px 45px',
        boxShadow: '0px 12px 40px rgb(0 0 0 / 20%)',
        borderRadius: '30px'
    }} maxW={'900px'} maxH={'660px'}>
        <div style={{ top: '30px', right: '30px', position: 'absolute', cursor: 'pointer' }} onClick={props.onClose}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 1L8 8M15 15L8 8M8 8L15 1M8 8L1 15" stroke="#828282" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path></svg>
        </div>

        <div style={{ overflowX: 'auto' }}>
            <EditProfile {...props} />
            <AddContent {...props} />
        </div>

    </ModalContent>
}
