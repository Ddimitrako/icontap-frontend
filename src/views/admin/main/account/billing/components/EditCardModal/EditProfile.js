import React, { useState } from "react";
import { CustomEditBox, SocialButton } from "./EditCardModal";

import './EditCardModal.css';

//The container modal

export default function EditProfile(props) {

    const [name, setname] = useState('');
    const [bio, setbio] = useState('');

    const selectImgButtonRadius = 30;

    const SelectImgButton = ({ styles }) => <div
        style={{
            width: `${selectImgButtonRadius * 2}px`,
            height: `${selectImgButtonRadius * 2}px`,
            position: 'absolute',
            backgroundColor: 'white',
            borderRadius: `${selectImgButtonRadius * 2}px`,
            cursor: 'pointer',
            backgroundImage: 'url(/static/media/CameraFill.svg)',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundSize: '60%',
            boxShadow: '4px 4px 10px grey',
            ...styles
        }}
    >
    </div>

    const avatarRadius = 120;

    const Avatar = ({ styles }) => <div style={{
        width: `${avatarRadius * 2}px`,
        height: `${avatarRadius * 2}px`,
        position: 'absolute',
        backgroundColor: 'blue',
        borderRadius: `${avatarRadius}px`,
        border: 'solid white 7px',
        boxShadow: '4px 4px 10px grey',
        ...styles
    }}>

    </div>

    const calculateImageButtonPosition = () => {
        let result = (((avatarRadius * 2) / Math.sqrt(2)) - avatarRadius) / (Math.sqrt(2));
        console.log(result);
        return (avatarRadius - result) + selectImgButtonRadius;
    }

    const Cover = () => <div
        style={{
            minHeight: '300px',
            backgroundColor: 'red',
            paddingRight: '50px',
            borderBottomRightRadius: '30px',
            borderBottomLeftRadius: '30px',
            marginBottom: `${avatarRadius + 50}px`,
            position: 'relative'
        }}
    >

        <SelectImgButton styles={{ top: '20px', right: '20px' }} />
        <Avatar styles={{ bottom: `-${avatarRadius}px`, left: `calc(50% - ${avatarRadius}px)` }} />
        <SelectImgButton styles={{ bottom: `-${calculateImageButtonPosition()}px`, right: `calc(50% - ${calculateImageButtonPosition()}px)` }} />

    </div>;

    return <div style={{
        paddingBottom: '500px',
    }}>

        <Cover />

        <CustomEditBox caption={'Name'} value={name} onChange={setname} />
        <CustomEditBox caption={'Bio'} value={bio} onChange={setbio} />

        <div style={{
            width: '90%',
            margin: '50px auto 20px auto'
        }}>

            <SocialButton />

        </div>

    </div>
}
