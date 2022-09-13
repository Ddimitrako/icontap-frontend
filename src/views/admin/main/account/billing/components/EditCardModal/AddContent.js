import { hostNameStorage } from "Helpers/App";
import React, { useState } from "react";

import './EditCardModal.css';

//The container modal

export default function AddContent(props) {
    console.log(props);
    const SocialDummies = [
        { title: 'Custom', imgUrl: 'custom.svg', url: 'www.example.com' },
        { title: 'Facebook', imgUrl: 'fb.png', url: 'www.fb.com' },
        { title: 'Linkedin', imgUrl: 'linkedin.png', url: 'www.linkedin.com' },
        { title: 'Instagram', imgUrl: 'instagram.png', url: 'www.instagram.com' },
        { title: 'Airbnb', imgUrl: 'airbnb.png', url: 'www.airbnb.com' },
        { title: 'Email', imgUrl: 'email.png', url: 'www.email.com' },
    ];

    const [search, setsearch]=useState('');

    const SocialDefault = ({ social }) => {

        function insertSocial() {
            props.settempSocialData(social);
            props.setcurrSocial(undefined);
            props.setPage('EditLink');
        }

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
                backgroundImage: `url(${hostNameStorage}/${social.imgUrl})`,
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                backgroundSize: '110%',
                borderRadius: '5px'
            }}></div>

            <span style={{ float: 'left', lineHeight: '40px', fontWeight: 'bold' }}>{social.title}</span>

            <button onClick={() => {
                insertSocial();
            }}

                style={{
                    backgroundColor: 'white',
                    borderRadius: '10px',
                    height: '30px',
                    width: '50px',
                    marginTop: '5px',
                    float: 'right'
                }}>+</button>
        </div>
    }

    return <div style={{ paddingBottom: '500px' }}>
        <div className="jss356">
            <div className="jss357">
                <span>
                    Add content
                </span>
            </div>
            <div className="jss359">
                <div>
                    <span className="jss358">
                        Select from our wide variety of links and contact info below.
                    </span>
                </div>
                <div className="jss369">
                    <div className="jss371">
                        <svg width="16" height="16" fill="none" viewBox="0 0 16 16">
                            <path d="M6.66667 11.3333C9.244 11.3333 11.3333 9.244 11.3333 6.66667C11.3333 4.08934 9.244 2 6.66667 2C4.08934 2 2 4.08934 2 6.66667C2 9.244 4.08934 11.3333 6.66667 11.3333Z" stroke="#828282" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"></path>
                            <path d="M13.0911 13.0911L10 10" stroke="#828282" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"></path>
                        </svg>
                    </div>
                    <div className="MuiInputBase-root jss370 MuiInputBase-fullWidth">
                        <input value={search} onChange={(e)=>setsearch(e.target.value)} placeholder="Search content..."  type="text" aria-label="search here" className="MuiInputBase-input" />
                    </div>
                </div>
            </div>
        </div>
        <div style={{ overflow: 'auto' }}>
            {props?.socialDefaults?.filter((social)=>social.title.toLowerCase().includes(search.toLowerCase())).map((social, index) => <SocialDefault social={social} key={index} />)}
        </div>
    </div>
}
