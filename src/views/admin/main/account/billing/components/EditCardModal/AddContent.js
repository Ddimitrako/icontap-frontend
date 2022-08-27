import React, { useState } from "react";

import './EditCardModal.css';

//The container modal

export default function AddContent(props) {
    
    return <div style={{ paddingBottom: '500px' }}>
        <button onClick={() => { props.setPage('EditLink') }}>OK</button>
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
                        <input placeholder="Search content..." type="text" aria-label="search here" className="MuiInputBase-input" defaultValue="" />
                    </div>
                </div>
            </div>
        </div>
    </div>
}
