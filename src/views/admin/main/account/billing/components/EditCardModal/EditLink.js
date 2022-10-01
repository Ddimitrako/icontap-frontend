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
import { deepCopy } from "Helpers/Arrays";
import { hostNameStorage } from "Helpers/App";
import { readURL } from "Helpers/Images";

//The container modal

export default function EditLink(props) {

    const [ready, setReady] = useState(false);
    const [url, setUrl] = useState(props?.tempSocialData?.url ?? (props.socials[props.currSocial]?.url ?? ''));
    const [title, setTitle] = useState(props?.tempSocialData?.title ?? (props.socials[props.currSocial]?.title ?? ''));
    const [imgUrl, setimgUrl] = useState(props?.tempSocialData?.imgUrl ?? (props.socials[props.currSocial]?.imgUrl ?? 'custom.svg'));

    useEffect(()=>{
        // console.log('props', props);
    },[]);

    useEffect(() => {

        let urlReady = url != '';
        let titleReady = title != '';
        let allReady = urlReady && titleReady;

        setReady(allReady);

    }, [url, title]);

    function upsertSocials() {
        let tempSocials = deepCopy(props.socials);
        console.log(tempSocials);
        console.log(props?.tempSocialData);
        console.log(props.currSocial);
        let tempCurrSocialData = {...props?.tempSocialData, url: url, title: title, imgUrl: img?.blob?{blob:img.blob, blobUrl:img.url, url:imgUrl}:imgUrl };
        console.log(tempCurrSocialData);

        if (props.currSocial !== undefined) {
            tempSocials[props.currSocial] = tempCurrSocialData;
        } else {
            tempSocials.push(tempCurrSocialData);
        }

        // console.log(tempSocials,props);

        props.setsocials(tempSocials);
        props.onClose();
    }
    
    function deleteSocial() {
        console.log(props.currSocial, props.socials[props.currSocial]);
        let tempSocials = deepCopy(props.socials);
        tempSocials.splice(props.currSocial, 1);
        props.setsocials(tempSocials);
        if(!(props.socials[props.currSocial].category || props.socials[props.currSocial].category_id))
            props.setoldsocials([...props.oldsocials, props.socials[props.currSocial]?.id]);
        props.onClose();
    }

    const [img, setimg]=useState();

    return <ModalContent style={{
        padding: '0',
        boxShadow: '0px 12px 40px rgb(0 0 0 / 20%)',
        borderRadius: '30px'
    }} maxW={'900px'} maxH={'660px'}>
        <div style={{ top: '30px', right: '30px', position: 'absolute', cursor: 'pointer' }} onClick={props.onClose}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 1L8 8M15 15L8 8M8 8L15 1M8 8L1 15" stroke="#828282" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                </path>
            </svg>
        </div>

        {/* <div className="jss488" onClick={() => { props.onClose();}}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 6L8 10L12 14" stroke="#828282" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                </path>
            </svg>
            <span>Back</span>
        </div> */}

        <div className="jss489">
            <div className="jss497">
                <div className="jss521 jss527">
                    <input type="file" />
                    <div>
                        <img className="jss498" alt="link" src={img?.url ?? `${hostNameStorage}/${imgUrl}`} style={{ borderRadius: '10px', objectFit: 'cover' }} />
                    </div>
                </div>
                <div>
                    <div className="jss499">
                        <label style={{ maxWidth: '220px', paddingBottom: '10px', fontWeight:'bold', color:'#6e6ed1', cursor:'pointer' }}>Select photo here
                            <input type="file" style={{ display: 'none' }} onChange={(e) => readURL(e, setimg)} />
                        </label>
                    </div>
                </div>
            </div>

            <div className="jss500">
                <div data-testid="link-url" className="jss501">
                    <span className="jss502">Link Title</span>
                    <div className="jss530" style={{ minHeight: '50px', maxHeight: '50px' }}>
                        <div className="MuiInputBase-root jss532 MuiInputBase-fullWidth MuiInputBase-marginDense">
                            <input onChange={(e) => { setTitle(e.target.value) }} value={title} name="title" placeholder="URL" type="text" aria-label="search here" className="MuiInputBase-input jss533 MuiInputBase-inputMarginDense" style={{ lineHeight: '130%', height: '100%' }} />
                        </div>
                    </div>
                </div>
                <div data-testid="link-title" className="jss501">
                    <span className="jss502">Link url</span>
                    <div className="jss530" style={{ minHeight: '50px', maxHeight: '50px' }}>
                        <div className="MuiInputBase-root jss532 MuiInputBase-fullWidth MuiInputBase-marginDense">
                            <input onChange={(e) => { setUrl(e.target.value) }} value={url} name="title" placeholder="Text" type="text" aria-label="search here" className="MuiInputBase-input jss533 MuiInputBase-inputMarginDense" style={{ lineHeight: '130%', height: '100%' }} />
                        </div>
                    </div>
                </div>
            </div>

            <div className="jss540">
                <a target="_blank" rel="noreferrer" onClick={()=>{window.open(url.substring(0,4)=='http'?url:`//${url}`, '_blank')}}>
                    <p className={`jss541 ${ready ? 'jss541-ready' : ''}`}>Test your link</p>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="#cdcdcd">
                        <path d="M384 320c-17.67 0-32 14.33-32 32v96H64V160h96c17.67 0 32-14.32 32-32s-14.33-32-32-32L64 96c-35.35 0-64 28.65-64 64V448c0 35.34 28.65 64 64 64h288c35.35 0 64-28.66 64-64v-96C416 334.3 401.7 320 384 320zM488 0H352c-12.94 0-24.62 7.797-29.56 19.75c-4.969 11.97-2.219 25.72 6.938 34.88L370.8 96L169.4 297.4c-12.5 12.5-12.5 32.75 0 45.25C175.6 348.9 183.8 352 192 352s16.38-3.125 22.62-9.375L416 141.3l41.38 41.38c9.156 9.141 22.88 11.84 34.88 6.938C504.2 184.6 512 172.9 512 160V24C512 10.74 501.3 0 488 0z">
                        </path>
                    </svg>
                </a>
            </div>

            <div className="jss550">
                <button style={{borderRadius:'10px'}} onClick={() => { props.onClose(); }} className="MuiButtonBase-root MuiButton-root MuiButton-text jss560" tabIndex="0" type="button">
                    <span className="MuiButton-label">Cancel</span>
                    {/* <span className="MuiTouchRipple-root">
                    </span> */}
                </button>
                <button style={{borderRadius:'10px'}} onClick={upsertSocials} className={`MuiButtonBase-root MuiButton-root MuiButton-contained jss565 MuiButton-containedPrimary ${ready ? '' : 'Mui-disabled'}`} type="button" disabled="">
                    <span className="MuiButton-label">{props.currSocial == undefined ? 'Add link' : 'Update link'}</span>
                </button>
                {props.currSocial !== undefined && <button onClick={deleteSocial} className={`MuiButtonBase-root MuiButton-root MuiButton-contained jss565`} style={{
                    color:'white',
                    backgroundColor:'#c40303',
                    borderRadius:'10px'
                }} type="button" disabled="">
                    <span className="MuiButton-label">Delete Link</span>
                </button>}
            </div>
        </div>

    </ModalContent>
}
