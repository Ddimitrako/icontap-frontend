import { Button, useDisclosure } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AddContentContainer from "./AddContentContainer";
import EditCardModal, { CustomEditBox, SocialButton } from "./EditCardModal";
import axios from "axios";
import './EditCardModal.css';
import EditLink from "./EditLink";
import { hostName } from "Helpers/App";
import { useContext } from "react";
import { TitleContext } from "Helpers/Context";
import { hostNameStorage } from "Helpers/App";

//The container modal

export default function EditProfile(props) {

    const [card, setcard] = useState({});
    const [name, setname] = useState('');
    const [bio, setbio] = useState('');
    const [job, setjob] = useState('');
    const [company, setcompany] = useState('');

    const [avatar, setavatar] = useState({url:'/static/media/img.jpg'});
    const [cover, setcover] = useState({url:'/static/media/img.jpg'});

    const dataURLToBlob = function (dataURL) {
        var BASE64_MARKER = ';base64,';
        if (dataURL.indexOf(BASE64_MARKER) == -1) {
            var parts = dataURL.split(',');
            var contentType = parts[0].split(':')[1];
            var raw = parts[1];

            return new Blob([raw], { type: contentType });
        }

        var parts = dataURL.split(BASE64_MARKER);
        var contentType = parts[0].split(':')[1];
        var raw = window.atob(parts[1]);
        var rawLength = raw.length;

        var uInt8Array = new Uint8Array(rawLength);

        for (var i = 0; i < rawLength; ++i) {
            uInt8Array[i] = raw.charCodeAt(i);
        }

        return new Blob([uInt8Array], { type: contentType });
    }

    function readURL(input, setter) {
        console.log(input, input.files);
        if (input.target.files && input.target.files[0]) {
            var reader = new FileReader();

            reader.onload = function (e) {
                console.log(e.target.result);
                var image = new Image();
                image.onload = function (imageEvent) {

                    // Resize the image
                    var canvas = document.createElement('canvas'),
                        max_size = 544,
                        width = image.width,
                        height = image.height;
                    if (width > height) {
                        if (width > max_size) {
                            height *= max_size / width;
                            width = max_size;
                        }
                    } else {
                        if (height > max_size) {
                            width *= max_size / height;
                            height = max_size;
                        }
                    }
                    canvas.width = width;
                    canvas.height = height;
                    canvas.getContext('2d').drawImage(image, 0, 0, width, height);
                    var dataUrl = canvas.toDataURL('image/jpeg');
                    var resizedImage = dataURLToBlob(dataUrl);
                    setter({
                        url:dataUrl,
                        blob:resizedImage
                    })
                }
                image.src = e.target.result;
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
        <input type="file" style={{ display: 'none' }} onChange={(e) => readURL(e, setter)} />

    </label>

    const avatarRadius = 120;

    const Avatar = ({ styles }) => <div style={{
        width: `${avatarRadius * 2}px`,
        height: `${avatarRadius * 2}px`,
        position: 'absolute',
        backgroundColor: 'blue',
        background: 'white url(' + avatar.url + ') left top no-repeat',
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
            background: 'white url(' + cover.url + ') left top no-repeat',
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
        setcurrSocial(undefined);
        setPage('EditLink');
    }

    const { isOpen, onOpen, onClose } = useDisclosure();

    useEffect(() => {
        if (!isOpen) {
            settempSocialData(null);
        }
    }, [isOpen]);

    const [page, setPage] = useState('AddContentContainer');

    const [socials, setsocials] = useState([]);

    const [currSocial, setcurrSocial] = useState();
    
    const [socialDefaults, setsocialDefaults] = useState();

    const [tempSocialData, settempSocialData] = useState();

    const pages = {
        // 'EditProfileContainer': <EditProfileContainer {...props} setPage={setPage} settempSocialData={settempSocialData} setcurrSocial={setcurrSocial} socials={socials} setsocials={setsocials} />,
        'AddContentContainer': <AddContentContainer onClose={onClose} setPage={setPage} settempSocialData={settempSocialData} setcurrSocial={setcurrSocial} socialDefaults={socialDefaults} socials={socials} setsocials={setsocials} />,
        'EditLink': <EditLink setPage={setPage} onClose={onClose} currSocial={currSocial} tempSocialData={tempSocialData} socials={socials} setsocials={setsocials} />
    }

    let { cardId } = useParams();

    const [loading, setloading] = useState(true);

    function getProfile() {
        setloading(true);
        axios({
            method: 'get',
            url: `${hostName}/card/${cardId}`
        }).then((response) => {
            console.log(response);
            setcard(response.data.data);
        }).catch((err) => {
            console.log(err.response);
        }).finally(() => {
            setloading(false);
        })
    }

    const [contentloading, setcontentloading]=useState(true);

    function getContents() {
        setcontentloading(true);
        axios({
            method: 'get',
            url: `${hostName}/contents`
        }).then((response) => {
            console.log(response);
            setsocialDefaults(parseContents(response.data.data));
        }).catch((err) => {
            console.log(err.response);
        }).finally(() => {
            setcontentloading(false);
        })
    }

    function parseContents(categories) {
        let contents = []
        Object.keys(categories).forEach((c, i) => {
            categories[c].forEach((con, i) => {
                con={...con, imgUrl: con.image, title: con.name, url: ''}
                contents.push(con);
            });
        });
        console.log("contents", contents);
        return contents;
    }

    useEffect(() => {
        getProfile();
        getContents();
    }, []);

    const [TitleContextValue, setTitleContextValue] = useContext(TitleContext);

    useEffect(() => {
        if (card.profile) {
            console.log(card);
            setname(card?.profile?.name ?? '');
            setbio(card?.profile?.bio ?? '');
            setjob(card?.profile?.job_title ?? '');
            setcompany(card?.profile?.company ?? '');
            setTitleContextValue(card.title);
            setcover({...cover, url:`${hostNameStorage}/${card.images.img_cover}`});
            setavatar({...avatar, url:`${hostNameStorage}/${card.images.img_profile}`});
        }
    }, [card]);

    useEffect(()=>{
        console.log('cover', cover, avatar);
    },[cover, avatar]);

    const [updating, setUpdating] = useState(false);

    function updateContents() {

        let parsedContents=socials.map((c,i)=>{return {
            "content_id": c.id,
            "image": c.imgUrl,
            "link": c.url,
            "title": c.title,
            "description": "",
            "is_active": true,
            "order":i
        }});
        console.log("parseContents",parsedContents);
        
        setUpdating(true);

        axios({
            method: 'post',
            url: `${hostName}/card/${card.code}/contents`,
            data: {contents:parsedContents},
            // headers: {
            //     'accept': 'application/json',
            //     'Content-Type': 'multipart/form-data'
            // }
        }).then((response) => {
            console.log(response);
        }).catch((err) => {
            console.log(err.response);
        }).finally(() => {
            setUpdating(false);
            getProfile();
        })
    }

    function updateProfile() {

        setUpdating(true);
        updateContents();
        const formData = new FormData();
        formData.append('name', name);
        formData.append('bio', bio);
        formData.append('company', company);
        formData.append('job_title', job);

        if(avatar.blob)
        formData.append('img_profile', avatar.blob);
        if(cover.blob)
        formData.append('img_cover', cover.blob);
        console.log('avatar.blob', avatar.blob);
        console.log('avatar.profile', avatar.profile);
        axios({
            method: 'post',
            url: `${hostName}/profile/${card.profile.id}`,
            data: formData,
            headers: {
                'accept': 'application/json',
                'Content-Type': 'multipart/form-data'
            }
        }).then((response) => {
            console.log(response);
        }).catch((err) => {
            console.log(err.response);
        }).finally(() => {
            console.log(formData);
            setUpdating(false);
            getProfile();
        })
    }

    return loading ?
        <Button isLoading
            loadingText="Please wait"
            variant="transparent-with-icon"
            spinnerPlacement="start"></Button>
        : <div style={{
            paddingBottom: '100px',
        }}>
            <Cover />

            <CustomEditBox caption={'Name'} value={name} onChange={setname} />
            <CustomEditBox caption={'Bio'} value={bio} onChange={setbio} />
            <CustomEditBox caption={'Job title'} value={job} onChange={setjob} />
            <CustomEditBox caption={'Company'} value={company} onChange={setcompany} />

            <div style={{
                width: '90%',
                margin: '50px auto 20px auto',
                overflow: 'auto'
            }}>
                {socials?.map((social, index) =>
                    <SocialButton imgUrl={social.imgUrl} styles={{}} onClick={() => {
                        setcurrSocial(index);
                        setPage('EditLink');
                        onOpen();
                    }} key={index} />
                )}

            </div>

            <div style={{
                width: '100%',
                textAlign: 'center'
            }}>
                <EditCardModal pages={pages} page={page} isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
                <Button
                    style={{
                        borderRadius: '10px',
                        padding: '15px 20px'
                    }}
                    onClick={() => {
                        setPage('AddContentContainer');
                        onOpen();
                    }}
                    colorScheme="blackAlpha"
                    >
                    + Add links and Contact info
                </Button>
            </div>

            <hr style={{ 'margin': '20px 0' }} />
            <div style={{ textAlign: 'center' }}>
                <Button
                    style={{
                        borderRadius: '10px',
                        padding: '15px 20px'
                    }}

                    colorScheme='green'

                    size='lg'

                    isLoading={updating}

                    onClick={updateProfile}>
                    Update
                </Button>
            </div>

        </div>
}
