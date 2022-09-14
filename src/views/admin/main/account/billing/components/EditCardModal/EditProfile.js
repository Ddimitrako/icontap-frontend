import { Button, FormHelperText, FormLabel, Input, Stack, Textarea, useDisclosure } from "@chakra-ui/react";
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
import Cover from "views/admin/cards/cardProfile/components/Cover";

//The container modal

export default function EditProfile(props) {

    const [card, setcard] = useState({});

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
        console.log('getProfile');
        axios({
            method: 'get',
            url: `${hostName}/card/${cardId}`
        }).then((response) => {
            console.log(response);
            setcard(response.data.data);
            getContents();
        }).catch((err) => {
            console.log(err.response);
        }).finally(() => {
            setloading(false);
        })
    }

    const [contentloading, setcontentloading]=useState(true);
    
    function parseProfileContents() {
        // console.log('parsedSocials', card);
        let parsedSocials=[];
        card.content.forEach((c,i)=>{
            // console.log('1',c,i);
            c={...c, imgUrl:c?.image, title:c.title, url:c.link};
            // console.log('2',c,i);
            parsedSocials.push(c);
        });
        // console.log('parsedSocials2', parsedSocials);
        return parsedSocials;
    }
    
    function getContents() {
        setcontentloading(true);
        console.log('getContents');
        axios({
            method: 'get',
            url: `${hostName}/contents`
        }).then((response) => {
            console.log(response);
            setsocialDefaults(parseContents(response.data.data));
            // console.log('prof');
            // parseProfileContents();
            setcontentloading(false);
        }).catch((err) => {
            console.log(err.response);
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
        // console.log("contents", contents);
        return contents;
    }

    useEffect(() => {
        getProfile();
    }, []);

    const [TitleContextValue, setTitleContextValue] = useContext(TitleContext);

    useEffect(() => {
        if (card.profile) {
            // console.log(card);
            props.setname(card?.profile?.name ?? '');
            props.setbio(card?.profile?.bio ?? '');
            props.setjob(card?.profile?.job_title ?? '');
            props.setcompany(card?.profile?.company ?? '');
            setTitleContextValue(card.title);
            props.setcover({...props.cover, url:card?.images?.img_cover?`${hostNameStorage}/${card?.images?.img_cover}`:'/static/media/img.jpg'});
            props.setavatar({...props.avatar, url:card?.images?.img_profile?`${hostNameStorage}/${card?.images?.img_profile}`:'/static/media/img.jpg'});
            setsocials(parseProfileContents());
            props.setCard(card);
        }
    }, [card]);

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
        
        
        console.log('updateContents', parsedContents);
        
        setUpdating(true);
        const payload={contents:parsedContents};
        axios({
            method: 'post',
            url: `${hostName}/card/${card.code}/contents`,
            data: payload,
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/json'
            }
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
        formData.append('name', props.name);
        formData.append('bio', props.bio);
        formData.append('company', props.company);
        formData.append('job_title', props.job);

        if(props.avatar.blob)
        formData.append('img_profile', props.avatar.blob);
        if(props.cover.blob)
        formData.append('img_cover', props.cover.blob);
        
        // console.log('updateProfile');
        axios({
            method: 'post',
            url: `${hostName}/profile/${card.profile.id}`,
            data: formData,
            headers: {
                'accept': 'application/json',
                'Content-Type': 'multipart/form-data'
            }
        }).then((response) => {
            // console.log(response);
        }).catch((err) => {
            // console.log(err.response);
        }).finally(() => {
            // console.log(formData);
            setUpdating(false);
            getProfile();
        })
    }

    const ProfileData= loading ?
        <Button isLoading
            loadingText="Please wait"
            variant="transparent-with-icon"
            spinnerPlacement="start"></Button>
        : <div style={{
            paddingBottom: '100px',
        }}>
            <Cover avatarRadius={120} avatar={props.avatar} setavatar={props.setavatar} cover={props.cover} setcover={props.setcover} editable />

            <Stack spacing={3}>
                <FormLabel>Name</FormLabel>
                <Input variant='filled' caption={'Name'} value={props.name} onChange={(e) => props.setname(e.target.value)} />
                <FormHelperText>Type text.</FormHelperText>
                <FormLabel>Bio</FormLabel>
                <Textarea variant='filled' caption={'Bio'} value={props.bio} onChange={(e) => props.setbio(e.target.value)} />
                <FormHelperText>Type text.</FormHelperText>
                <FormLabel>Job Title</FormLabel>
                <Input variant='filled' caption={'Job title'} value={props.job} onChange={(e) => props.setjob(e.target.value)} />
                <FormHelperText>Type text.</FormHelperText>
                <FormLabel>Company</FormLabel>
                <Input variant='filled' caption={'Company'} value={props.company} onChange={(e) => props.setcompany(e.target.value)} />
                <FormHelperText>Type text.</FormHelperText>
            </Stack>

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
                    isLoading={contentloading}
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

        </div>;

    return ProfileData;
}
