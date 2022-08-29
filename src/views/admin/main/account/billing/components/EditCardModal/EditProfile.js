import React, { useState } from "react";
import { CustomEditBox, SocialButton } from "./EditCardModal";

import './EditCardModal.css';

//The container modal

export default function EditProfile(props) {

    const [name, setname] = useState('');
    const [bio, setbio] = useState('');

    const [avatar, setavatar] = useState('/static/media/img.jpg');
    const [cover, setcover] = useState('/static/media/img.jpg');

    function readURL(input,setter) {
        console.log(input, input.files);
        if (input.target.files && input.target.files[0]) {
            var reader = new FileReader();

            reader.onload = function (e) {
                console.log(e.target.result);
                setter(e.target.result);
            }

            reader.readAsDataURL(input.target.files[0]);
        }
    }
    const selectImgButtonRadius = 30;

    const SelectImgButton = ({ styles, setter }) => <label
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
        <input type="file" style={{ display: 'none' }} onChange={(e) => readURL(e,setter)} />

    </label>

    const avatarRadius = 120;

    const Avatar = ({ styles }) => <div style={{
        width: `${avatarRadius * 2}px`,
        height: `${avatarRadius * 2}px`,
        position: 'absolute',
        backgroundColor: 'blue',
        background: 'white url(' + avatar + ') left top no-repeat',
        borderRadius: `${avatarRadius}px`,
        border: 'solid white 7px',
        boxShadow: '4px 4px 10px grey',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        ...styles
    }}>

    </div>

    const calculateImageButtonPosition = () => {
        let result = (((avatarRadius * 2) / Math.sqrt(2)) - avatarRadius) / (Math.sqrt(2));
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
            background: 'white url(' + cover + ') left top no-repeat',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            position: 'relative',
            boxShadow: '4px 4px 10px grey',
        }}
    >

        <SelectImgButton styles={{ top: '20px', right: '20px' }} setter={setcover} />
        <Avatar styles={{ bottom: `-${avatarRadius}px`, left: `calc(50% - ${avatarRadius}px)` }} />
        <SelectImgButton setter={setavatar} styles={{ bottom: `-${calculateImageButtonPosition()}px`, right: `calc(50% - ${calculateImageButtonPosition()}px)` }} />

    </div>;

    function insertSocial() {
        props.setcurrSocial(undefined);
        props.setPage('EditLink');
    }

    return <div style={{
        paddingBottom: '100px',
    }}>

        <Cover />

        <CustomEditBox caption={'Name'} value={name} onChange={setname} />
        <CustomEditBox caption={'Bio'} value={bio} onChange={setbio} />

        <div style={{
            width: '90%',
            margin: '50px auto 20px auto',
            overflow: 'auto'
        }}>
            {props.socials.map((social, index) =>
                <SocialButton imgUrl={social.imgUrl} styles={{}} onClick={() => {
                    props.setcurrSocial(index);
                    props.setPage('EditLink');
                }} key={index} />
            )}

        </div>

        <div style={{
            width: '100%',
            textAlign: 'center'
        }}>
            <button
                style={{
                    borderRadius: '10px',
                    padding: '15px 20px'
                }}
                className={`MuiButtonBase-root MuiButton-root MuiButton-contained MuiButton-containedPrimary`} tabIndex="-1" type="button" disabled="">
                <span className="MuiButton-label" onClick={() => props.setPage('AddContentContainer') }>+ Add links and Contact info</span>
            </button>
        </div>

    </div>
}
