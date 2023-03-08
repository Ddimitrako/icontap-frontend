import { Button, Flex, FormControl, FormLabel, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, Spinner, Text, useDisclosure } from "@chakra-ui/react";
import { Card, CardContent, CardHeader, Input } from "@material-ui/core";
import { hostName } from "Helpers/App";
import react from "react";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { hostNameStorage } from "Helpers/App";
import { readURL } from "Helpers/Images";

export const socialCategories = [
    'Contact Info',
    'Social Media',
    'Business',
    'Payment',
    'Music',
    'More Content'
]

export default function EditSocials() {

    const [loading, setloading] = useState(false);
    const [socials, setsocials] = useState({});
    const [categories, setcategories] = useState({});
    const { isOpen, onOpen, onClose } = useDisclosure();

    function getContents() {
        setloading(true);
        onClose();
        // console.log('getContents');
        axios({
            method: 'get',
            url: `${hostName}/contents`
        }).then((response) => {
            console.log('getContents', response);
            setsocials(response.data.data);
            setloading(false);
        }).catch((err) => {
            console.log(err.response);
        })
    }

    useEffect(() => {
        getContents();
    }, []);

    const [currSocial, setcurrSocial]=useState(null);

    function SocialButton({ social }) {
        return <div style={{
            backgroundColor: 'rgb(247, 247, 247)',
            margin: '10px',
            float: 'left',
            padding: '20px',
            borderRadius: '20px',
            width: '240px'
        }}>

            <div style={{
                width: '40px',
                height: '40px',
                marginRight: '10px',
                float: 'left',
                backgroundImage: `url(${hostNameStorage}/${social.image})`,
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                backgroundSize: '110%',
                borderRadius: '5px'
            }}></div>

            <button onClick={() => {
                setname(social.name);
                setbaseUrl(social?.base_url??'');
                setimage(social.image);
                setcategoryId(social.category_id);
                setcurrSocial(social);
                onOpen();
            }}

                style={{
                    backgroundColor: 'white',
                    borderRadius: '10px',
                    height: '30px',
                    width: '50px',
                    marginTop: '5px',
                    float: 'right'
                }}>🖉</button>

            <span style={{ float: 'left', lineHeight: '40px', fontWeight: 'bold' }}>{social.name}</span>
        </div>
    }

    const [name, setname]=useState('');
    const [image, setimage]=useState();
    const [categoryId, setcategoryId]=useState(1);
    const [baseUrl, setbaseUrl]=useState('');

    function updateSocial() {
        const formData = new FormData();
        formData.append('name', name);
        if(image?.blob)
            formData.append('image', image?.blob);
        formData.append('category_id', categoryId);
        formData.append('base_url', baseUrl);

        axios({
            method: 'post',
            url: (currSocial?.id)?`${hostName}/contents/${currSocial.id}`:`${hostName}/contents`,
            data:formData
        }).then((response) => {
            console.log('updateSocial', response);
            getContents();
        }).catch((err) => {
            console.log(err.response);
        })
    }


    return !loading ? (
        <Flex direction='column'>
            <Card style={{ padding: '20px' }}>
                <Text
                    mt='25px'
                    mb='36px'
                    fontSize='2xl'
                    ms='24px'
                    fontWeight='700'> Socials
                </Text>
                <Button onClick={()=>{
                    setname('');
                    setbaseUrl('');
                    setimage('contents/customlink.svg');
                    setcategoryId(1);
                    setcurrSocial();
                    onOpen();
                }}
                className={'btn-custom-dark-background'}
                >🔨 Create New</Button>

                {Object.keys(socials).map((category, i) =>
                    <div style={{ overflow: 'auto', marginTop:'20px' }} key={i}>
                        <h5 style={{ fontWeight: 'bold' }}>{category}</h5>
                        <hr />
                        <div style={{ position: 'relative', width: '100%' }}>
                            {socials[category].map((s, i) =>
                                <SocialButton social={s} key={i} />
                            )}
                        </div>
                    </div>
                )}
            </Card>

            <Modal
                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>{currSocial?.name??'Create Social'}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <FormControl>
                        <img className="jss498" alt="link" src={image?.url ?? `${hostNameStorage}/${image}`} style={{ borderRadius: '10px', objectFit: 'cover' }} />
                        <label style={{ maxWidth: '220px', paddingBottom: '10px', fontWeight:'bold', color:'#6e6ed1', cursor:'pointer' }}>Select photo here
                            <input type="file" style={{ display: 'none' }} onChange={(e) => readURL(e, setimage)} />
                        </label>
                        </FormControl>
                        <FormControl>
                            <FormLabel>Name</FormLabel>
                            <Input placeholder='Name'
                            onChange={((e)=>setname(e.target.value))}
                            value={name}
                            />
                        </FormControl>

                        <FormControl>
                            <FormLabel>Base URL</FormLabel>
                            <Input placeholder='Base URL'
                            onChange={((e)=>setbaseUrl(e.target.value))}
                            value={baseUrl}
                            />
                        </FormControl>

                        <FormControl>
                            <FormLabel>Category</FormLabel>
                            <Select onChange={(e)=>setcategoryId(e.target.value)}>
                                {socialCategories.map((c,i)=><option defaultValue={categoryId} value={i+1} key={i}>{c}</option>)}
                            </Select>
                        </FormControl>

                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3}
                            onClick={(event) => {
                                updateSocial();
                            }}
                            disabled={!currSocial && (name=='' || baseUrl=='' || !(image?.blob))} 
                            >
                            {currSocial?'Update':'Create'} Social
                        </Button>
                        <Button onClick={(event) => {
                            onClose()
                        }}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

        </Flex>

    ) : <Spinner />;
}