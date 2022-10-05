import { Button, FormControl, FormHelperText, FormLabel, Input, Stack, Textarea, useDisclosure } from "@chakra-ui/react";
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
import { arrOfObjToFormData } from "Helpers/Arrays";

import { Draggable } from "react-drag-reorder";
import { deepCopy } from "Helpers/Arrays";

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

    const socials = props.socials;
    const setsocials = props.setsocials;

    const [currSocial, setcurrSocial] = useState();
    
    const [socialDefaults, setsocialDefaults] = useState();

    const [tempSocialData, settempSocialData] = useState();

    const [oldSocials, setoldSocials] = useState([]);

    const pages = {
        // 'EditProfileContainer': <EditProfileContainer {...props} setPage={setPage} settempSocialData={settempSocialData} setcurrSocial={setcurrSocial} socials={socials} setsocials={setsocials} />,
        'AddContentContainer': <AddContentContainer onClose={onClose} setPage={setPage} settempSocialData={settempSocialData} setcurrSocial={setcurrSocial} socialDefaults={socialDefaults} socials={socials} setsocials={setsocials} />,
        'EditLink': <EditLink socialimgs={props.socialimgs} setsocialimgs={props.setsocialimgs} setPage={setPage} onClose={onClose} currSocial={currSocial} tempSocialData={tempSocialData} socialDefaults={socialDefaults} socials={socials} setsocials={setsocials} oldsocials={oldSocials} setoldsocials={setoldSocials} />
    }

    let { cardId } = useParams();

    const [loading, setloading] = useState(true);

    function getProfile() {
        setloading(true);
        // console.log('getProfile');
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
        // console.log('getContents');
        axios({
            method: 'get',
            url: `${hostName}/contents`
        }).then((response) => {
            console.log('getContents',response);
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
                con={...con, content_id:con.id, imgUrl: con.image, title: con.name, url: ''}
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

    useEffect(()=>{
        props.setCard({...card, profile:{name:props.name, bio:props.bio}, images:{img_cover:props.cover, img_profile:props.avatar}});
    },[props.name, props.bio, props.avatar, props.cover]);

    const [updating, setUpdating] = useState(false);

    // useEffect(()=>{
    //     console.log('socialDefaults',socialDefaults);
    // },[socialDefaults]);

    function updateContents(test=false) {
        let parsedContents=socials.map((c,i)=>{
            console.log(c);
            return {
            "content_id": c.content_id,
            "image": props?.socialimgs[c.id]??c.imgUrl,
            "link": c.url,
            "title": c.title,
            "description": "",
            "is_active": 1,
            "order":i
        }});
        
        console.log('SOCIALS', arrOfObjToFormData(parsedContents, 'content'));

        // console.log('updateContents', parsedContents);

        setUpdating(true);
        
        const formData = new FormData();
        const formDataContents=arrOfObjToFormData(parsedContents, 'contents');
        Object.keys(formDataContents).forEach((key, i)=>{
            formData.append(key, formDataContents[key]);
        });
        if(oldSocials && oldSocials.length>0)
            oldSocials.forEach((o,i)=>{
                formData.append('old_contents[]', o);
            });    
        axios({
            method: 'post',
            url: `${hostName}/card/${card.code}/contents`,
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
            setoldSocials([]);
            setUpdating(false);
            getProfile();
        })
    }

    function updateProfile() {
        console.clear();
        setUpdating(true);
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
            console.log(response);
            updateContents();
        }).catch((err) => {
            console.log(err.response);
        }).finally(() => {
            setUpdating(false);
        })
    }

    // const getChangedPos = (currentPos, newPos) => {
    //     console.log(currentPos, newPos );
    //     let tempSocials=deepCopy(socials);
    //     console.log('tempSocials', tempSocials );
    //     tempSocials.move(currentPos, newPos);
    //     tempSocials = tempSocials.map((sc, i) => { return { ...sc, order: i } });
    //     console.log('tempSocials 1', tempSocials);
    //     setsocials(tempSocials);
    // };

    const [draggablesKey, setDraggablesKey] = useState(Math.random());

    useEffect(() => {
        console.log('socials', socials);
    }, [socials]);

    const socialContainer = React.createRef();

    const ProfileData = loading ?
        <Button isLoading
            loadingText="Please wait"
            variant="transparent-with-icon"
            spinnerPlacement="start"></Button>
        : <div style={{
            paddingBottom: '100px',
        }}>
            <Cover avatarRadius={80} avatar={props.avatar} setavatar={props.setavatar} cover={props.cover} setcover={props.setcover} editable />

            <Stack spacing={3}>
                <FormControl>
                    <FormLabel color={'#000000'}>Name</FormLabel>
                    <Input focusBorderColor='none' backgroundColor={'#f7f7f7'} placeholder={'Name'} caption={'Name'} value={props.name} onChange={(e) => props.setname(e.target.value)} />
                </FormControl>
                <FormControl color={'#000000'}>
                    <FormLabel>Bio</FormLabel>
                    <Textarea focusBorderColor='none' backgroundColor={'#f7f7f7'} placeholder={'Bio'} caption={'Bio'} value={props.bio} onChange={(e) => props.setbio(e.target.value)} />
                </FormControl>
            </Stack>

            <div style={{
                marginTop:'50px',
                width: '100%',
                textAlign: 'center'
            }}>
                <EditCardModal pages={pages} page={page} isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
                <Button
                    className={'btn-custom-dark-background'}
                    onClick={() => {
                        setPage('AddContentContainer');
                        onOpen();
                    }}
                    isLoading={contentloading}
                    style={{boxShadow:'0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%)'}}
                    >
                    + Add links and Contact info
                </Button>
            </div>

            <div
                className='social-btn-container'
            >
                <div className='wrap' style={{
                    display: 'flex',
                    listStyle: 'none',
                    height: '100%',
                    width: '100%'
                }}>
                    {/* <Draggable ref={socialContainer} onPosChange={getChangedPos} key={draggablesKey} style={{backgroundColor:'blue'}}> */}

                        {socials?.map((social, index) => {
                            // console.log(social);
                            return <SocialButton editable blobUrl={social.imgUrl.blobUrl} imgUrl={social.imgUrl} title={social.title} styles={{}} onClick={() => {
                                setcurrSocial(index);
                                settempSocialData(social);
                                setPage('EditLink');
                                onOpen();
                            }} key={index} />
                        }
                        )}
                    {/* </Draggable> */}

                </div>
            </div>

            <hr style={{ 'margin': '20px 0' }} />
            <div style={{ textAlign: 'center' }}>
                <Button
                    className="btn-custom-dark-background"

                    size='lg'

                    isLoading={updating}

                    style={{boxShadow:'0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%)'}}

                    onClick={updateProfile}>
                    Update
                </Button>

            </div>

        </div>;

    return ProfileData;
}
