import { Button, FormControl, FormHelperText, FormLabel, Icon, Input, ModalContent, Stack, Tab, TabList, TabPanel, TabPanels, Tabs, Textarea, useDisclosure } from "@chakra-ui/react";
import React, { useCallback, useEffect, useState } from "react";
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
import { demoCard } from "Helpers/Cards";
import { Crop } from "./Crop/Crop";
import getCroppedImg from "./Crop/cropImage";
import { DraggableList } from "./Drag/Drag";
import { MdGridView, MdList, MdViewModule } from "react-icons/md";
// import './styles.css'

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

    const [isAvatarCroppable, setisAvatarCroppable] = useState(true);
    const [isCoverCroppable, setisCoverCroppable] = useState(true);

    const pages = {
        'CropAvatar': <ModalContent style={{
            padding: '0',
            boxShadow: '0px 12px 40px rgb(0 0 0 / 20%)',
            borderRadius: '30px'
        }} w={'100%'} maxW={'900px'} h={'100%'} maxH={'660px'}
        >
            <Crop setisCroppable={setisAvatarCroppable} onClose={onClose} setCroppedImage={props.setavatar} cropShape={'round'} img={props.avatar.url} /></ModalContent>,
        'CropCover': <ModalContent style={{
            padding: '0',
            boxShadow: '0px 12px 40px rgb(0 0 0 / 20%)',
            borderRadius: '30px'
        }} w={'100%'} maxW={'900px'} h={'100%'} maxH={'660px'}
        >
            <Crop setisCroppable={setisCoverCroppable} onClose={onClose} setCroppedImage={props.setcover} cropShape={'rect'} img={props.cover.url} /></ModalContent>,
        // 'EditProfileContainer': <EditProfileContainer {...props} setPage={setPage} settempSocialData={settempSocialData} setcurrSocial={setcurrSocial} socials={socials} setsocials={setsocials} />,
        'AddContentContainer': <AddContentContainer onClose={onClose} setPage={setPage} settempSocialData={settempSocialData} setcurrSocial={setcurrSocial} socialDefaults={socialDefaults} socials={socials} setsocials={setsocials} />,
        'EditLink': <EditLink socialimgs={props.socialimgs} setsocialimgs={props.setsocialimgs} setPage={setPage} onClose={onClose} currSocial={currSocial} tempSocialData={tempSocialData} socialDefaults={socialDefaults} socials={socials} setsocials={setsocials} oldsocials={oldSocials} setoldsocials={setoldSocials} />
    }

    let { cardId } = useParams();

    const [loading, setloading] = useState(true);


    useEffect(async () => {
        // console.log('AVATAR', props.avatar.url);
        try {
            await getCroppedImg(
                props.avatar.url,
                { width: 1, height: 1, x: 0, y: 0 }
            )
        } catch (e) {
            console.error(e)
            return false;
        }

        if (isAvatarCroppable && props.avatar.url != '/static/media/profile.svg' && !props.avatar.url.includes(hostNameStorage)) {
            // console.log(props.avatar.url);
            setPage('CropAvatar');
            onOpen();
        }

        if (!isAvatarCroppable) {
            setisAvatarCroppable(true);
        }

    }, [props.avatar]);

    useEffect(async () => {
        // console.log('COVER', props.cover.url);
        try {
            await getCroppedImg(
                props.cover.url,
                { width: 1, height: 1, x: 0, y: 0 }
            )
        } catch (e) {
            console.error(e)
            return false;
        }

        if (isCoverCroppable && props.cover.url != '/static/media/cover.svg' && !props.cover.url.includes(hostNameStorage)) {
            // console.log(props.cover.url);
            setPage('CropCover');
            onOpen();
        }

        if (!isCoverCroppable) {
            setisCoverCroppable(true);
        }

    }, [props.cover]);

    function getProfile() {
        setloading(true);
        getContents();
        // console.log('getProfile');
        if (cardId == 'demo') {
            setcard(demoCard);
            setloading(false);
        } else {
            axios({
                method: 'get',
                url: `${hostName}/card/show/${cardId}`
            }).then((response) => {
                // console.log(response);
                setcard(response.data.data);
            }).catch((err) => {
                // console.log(err.response);
            }).finally(() => {
                setloading(false);
            })
        }
    }

    const [contentloading, setcontentloading] = useState(true);

    function parseProfileContents() {
        // console.log('parsedSocials', card);
        let parsedSocials = [];
        card.content.forEach((c, i) => {
            // console.log('1',c,i);
            c = { ...c, imgUrl: c?.image, title: c.title, url: c.link };
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
            // console.log('getContents',response);
            setsocialDefaults(parseContents(response.data.data));
            // console.log('prof');
            // parseProfileContents();
            setcontentloading(false);
        }).catch((err) => {
            // console.log(err.response);
        })
    }

    function parseContents(categories) {
        let contents = []
        Object.keys(categories).forEach((c, i) => {
            categories[c].forEach((con, i) => {
                con = { ...con, content_id: con.id, imgUrl: con.image, title: con.name, url: '' }
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
        // console.log(card);
        if (card.profile) {
            props.setname(card?.profile?.name ?? '');
            props.setbio(card?.profile?.bio ?? '');
            props.setjob(card?.profile?.job_title ?? '');
            props.setcompany(card?.profile?.company ?? '');
            setTitleContextValue(card.title);
            props.setcover({ ...props.cover, url: card?.images?.img_cover ? `${hostNameStorage}/${card?.images?.img_cover}` : '/static/media/cover.svg' });
            props.setavatar({ ...props.avatar, url: card?.images?.img_profile ? `${hostNameStorage}/${card?.images?.img_profile}` : '/static/media/profile.svg' });
            setsocials(parseProfileContents());
            props.setCard(card);
        };
    }, [card]);

    useEffect(() => {
        props.setCard({ ...card, profile: { name: props.name, bio: props.bio }, images: { img_cover: props.cover, img_profile: props.avatar } });
    }, [props.name, props.bio, props.avatar, props.cover]);

    const [updating, setUpdating] = useState(false);

    // useEffect(()=>{
    //     console.log('socialDefaults',socialDefaults);
    // },[socialDefaults]);

    function updateContents(test = false) {
        // console.log('socialimgs, socials', props?.socialimgs, socials);

        let parsedContents = socials.map((c, i) => {
            // console.log(c);
            return {
                "content_id": c.content_id,
                "image": props?.socialimgs[c.id] ?? c.imgUrl,
                "link": c.url,
                "title": c.title,
                "description": "",
                "is_active": 1,
                "order": i
            }
        });

        // console.log('SOCIALS', arrOfObjToFormData(parsedContents, 'content'));

        // console.log('updateContents', parsedContents);

        setUpdating(true);

        const formData = new FormData();
        const formDataContents = arrOfObjToFormData(parsedContents, 'contents');
        Object.keys(formDataContents).forEach((key, i) => {
            formData.append(key, formDataContents[key]);
        });
        if (oldSocials && oldSocials.length > 0)
            oldSocials.forEach((o, i) => {
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
            // console.log(response);
        }).catch((err) => {
            // console.log(err.response);
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

        if (props.avatar.blob)
            formData.append('img_profile', props.avatar.blob);
        if (props.cover.blob)
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
            updateContents();
        }).catch((err) => {
            // console.log(err.response);
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

    // useEffect(() => {
    //     console.log('socials', socials);
    // }, [socials]);

    const socialContainer = React.createRef();

    function openEditLink(index, social) {
        // console.log('editlink', index, social);
        setcurrSocial(index);
        settempSocialData(social);
        setPage('EditLink');
        onOpen();
    }

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
                marginTop: '50px',
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
                    style={{ boxShadow: '0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%)' }}
                >
                    + Add links and contact info
                </Button>
            </div> 
            <Tabs isFitted style={{marginTop:'20px'}}>
                <TabList mb='1em'>
                    <Tab _focus={{ boxShadow: "none", }}><Icon as={MdGridView} color={'black'} w='24px' h='24px' /></Tab>
                    <Tab _focus={{ boxShadow: "none", }}><Icon as={MdList} color={'black'} w='24px' h='24px' /></Tab>
                </TabList>
                <TabPanels>
                    <TabPanel>
                        <div
                            className='social-btn-container'
                        >
                            <div className='wrap' style={{
                                display: 'flex',
                                listStyle: 'none',
                                height: '100%',
                                width: '100%'
                            }}>
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
                            </div>
                        </div>
                    </TabPanel>
                    <TabPanel>
                        <DraggableList socials={socials} setsocials={setsocials} openEditLink={openEditLink} />
                    </TabPanel>
                </TabPanels>
            </Tabs>

            <hr style={{ 'margin': '20px 0' }} />
            <div style={{ textAlign: 'center' }}>
                <Button
                    className="btn-custom-dark-background"

                    size='lg'

                    isLoading={updating}

                    style={{ boxShadow: '0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%)' }}

                    onClick={() => { if (cardId != 'demo') { updateProfile() } }}>
                    Update
                </Button>

            </div>

        </div>;

    return ProfileData;
}
