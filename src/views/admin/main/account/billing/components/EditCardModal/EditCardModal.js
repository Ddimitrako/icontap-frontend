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

//The container modal

export default function EditCardModal(props) {
    return <Modal size={'xl'} style={{width:'1000px'}} isOpen={props.isOpen} onClose={props.onClose} isCentered>
        <ModalOverlay
            bg='blackAlpha.300'
            backdropFilter='blur(10px) hue-rotate(90deg)'
        />
        <ModalContent style={{
            padding:'48px 45px 12px 45px',
            boxShadow:'0px 12px 40px rgb(0 0 0 / 20%)',
            borderRadius:'30px'
        }} maxW={'900px'} maxH={'660px'}>
            <div style={{top:'30px', right:'30px', position:'absolute', cursor:'pointer'}} onClick={props.onClose}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 1L8 8M15 15L8 8M8 8L15 1M8 8L1 15" stroke="#828282" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>
            </div>
            
            <div className="jss356">
                <div className="jss357">
                    <span>
                        Add content
                    </span>
                </div>
                <div className="jss359">
                    <div>
                        <span className="jss358">
                            Select from our wide variety of links and contact info below.
                        </span>
                    </div>
                    <div className="jss369">
                        <div className="jss371">
                            <svg width="16" height="16" fill="none" viewBox="0 0 16 16">
                                <path d="M6.66667 11.3333C9.244 11.3333 11.3333 9.244 11.3333 6.66667C11.3333 4.08934 9.244 2 6.66667 2C4.08934 2 2 4.08934 2 6.66667C2 9.244 4.08934 11.3333 6.66667 11.3333Z" stroke="#828282" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"></path>
                                <path d="M13.0911 13.0911L10 10" stroke="#828282" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"></path>
                            </svg>
                        </div>
                        <div className="MuiInputBase-root jss370 MuiInputBase-fullWidth">
                            <input placeholder="Search content..." type="text" aria-label="search here" className="MuiInputBase-input" defaultValue="" />
                        </div>
                    </div>
                </div>
            </div>

            <div style={{overflowX:'auto'}}>
                <div style={{paddingTop:'5000px'}}></div>
            </div>
            {/* <ModalFooter>
                <Button colorScheme="brand" mr={3} onClick={props.onClose}>
                    Close
                </Button>
                <Button variant="ghost">Secondary Action</Button>
            </ModalFooter> */}
        </ModalContent>
    </Modal>
}
