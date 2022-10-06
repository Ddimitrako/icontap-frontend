import React, { useEffect, useState } from "react";

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
import EditProfileContainer from "./EditProfileContainer";
import AddContentContainer from "./AddContentContainer";
import { hostNameStorage } from "Helpers/App";
import { useHistory } from "react-router-dom";

//The container modal

export const CustomEditBox = ({ caption, value, onChange }) => <div className="jss530" style={{ minHeight: '50px', maxHeight: '50px', maxWidth: '80%', margin: '20px auto' }}>
    <div className="MuiInputBase-root jss532 MuiInputBase-fullWidth MuiInputBase-marginDense">
        <input onChange={(e) => { onChange(e.target.value) }} value={value} name={caption} placeholder={caption} type="text" aria-label="search here" className="MuiInputBase-input jss533 MuiInputBase-inputMarginDense" style={{ lineHeight: '130%', height: '100%' }} />
    </div>
</div>

export const SocialButton = ({ imgUrl, bgColor, onClick, styles, editable, url, base_url, title, blobUrl, preview=false }) => {

    const selectSocialSize = 30;

    const history=useHistory();

    const SelectImgButton = ({ styles }) => <div


        onClick={onClick}

        style={{
            width: `${selectSocialSize}px`,
            height: `${selectSocialSize}px`,
            right: `-${selectSocialSize / 4}px`,
            top: `-${selectSocialSize / 4}px`,
            position: 'absolute',
            backgroundColor: 'white',
            borderRadius: `${selectSocialSize}px`,
            cursor: 'pointer',
            backgroundImage: 'url(/static/media/edit.svg)',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundSize: '60%',
            boxShadow: '4px 4px 10px grey',
            ...styles
        }}
    >
    </div>

    return <div className={`cursor-grab ${preview?"social-button-preview":"social-button"}`}>
        <div style={{
            width: '100%',
            // height: '90px',
            paddingTop:'100%',
            marginBottom: '10px',
            borderRadius: '30%',
            backgroundColor: bgColor,
            position: 'relative',
            boxShadow: '4px 4px 10px grey',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundSize: '100%',
            backgroundImage: blobUrl?`url(${blobUrl})`:`url(${hostNameStorage}/${imgUrl})`,
            cursor: editable ? 'grab' : 'pointer',
            ...styles
        }}

            onClick={() => { if (!editable) window.open(base_url ? base_url+url : url, "_blank"); }}
        >
            {editable && <SelectImgButton />}
        </div>
        <div 
        className='social-label'
        style={{
            width:'100%',
            textAlign:'center'
        }}>{title}</div>
    </div>
}

export default function EditCardModal(props) {

    return <Modal size={'xl'} style={{ maxWidth: '1000px' }} isOpen={props.isOpen} onClose={props.onClose} isCentered>
        <ModalOverlay
            bg='blackAlpha.300'
            backdropFilter='blur(10px) hue-rotate(90deg)'
        />
        {props.pages[props.page]}
    </Modal>
}
