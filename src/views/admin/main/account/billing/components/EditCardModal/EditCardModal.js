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
import EditProfileAddContent from "./EditProfileAddContent";

//The container modal

export const CustomEditBox = ({ caption, value, onChange }) => <div className="jss530" style={{ minHeight: '50px', maxHeight: '50px', maxWidth: '80%', margin: '20px auto' }}>
    <div className="MuiInputBase-root jss532 MuiInputBase-fullWidth MuiInputBase-marginDense">
        <input onChange={(e) => { onChange(e.target.value) }} value={value} name={caption} placeholder={caption} type="text" aria-label="search here" className="MuiInputBase-input jss533 MuiInputBase-inputMarginDense" style={{ lineHeight: '130%', height: '100%' }} />
    </div>
</div>

export const SocialButton = ({ imgUrl, bgColor, onClick, styles }) => {

    const selectSocialSize = 30;

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

    return <div style={{
        width: '90px',
        height: '90px',
        borderRadius: '20px',
        backgroundColor: bgColor,
        position: 'relative',
        boxShadow: '4px 4px 10px grey',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: '110%',
        backgroundImage: `url(/static/media/social/${imgUrl})`,
        float: 'left',
        margin: '20px',
        ...styles
    }}>
        <SelectImgButton />
    </div>
}

export default function EditCardModal(props) {

    const [page, setPage] = useState('EditProfileAddContent');

    const [socials, setsocials] = useState([
        { imgUrl: 'sms.png', title: 'SMS', url: 'smsTo:12345678' }
    ]);

    const [currSocial, setcurrSocial] = useState();

    const [tempSocialData, settempSocialData] = useState();

    const pages = {
        'EditProfileAddContent': <EditProfileAddContent {...props} setPage={setPage} settempSocialData={settempSocialData} setcurrSocial={setcurrSocial} socials={socials} setsocials={setsocials} />,
        'EditLink': <EditLink {...props} setPage={setPage} currSocial={currSocial} tempSocialData={tempSocialData} socials={socials} setsocials={setsocials} />
    }

    useEffect(()=>{
        if(page=='EditProfileAddContent'){
            settempSocialData(null);
        }
    },[page]);

    return <Modal size={'xl'} style={{ maxWidth: '1000px' }} isOpen={props.isOpen} onClose={props.onClose} isCentered>
        <ModalOverlay
            bg='blackAlpha.300'
            backdropFilter='blur(10px) hue-rotate(90deg)'
        />
        {pages[page]}
    </Modal>
}
