import React, { useState } from 'react'
import { createPortal } from 'react-dom'
import {
    Image,
} from "@chakra-ui/react";
const CustomIframe = ({
  children,
  ...props
}) => {
  const [contentRef, setContentRef] = useState(null)

  const mountNode =
    contentRef?.contentWindow?.document?.body

  return (
      <div className="col-md-4" style={{background:'grey'}}>
        <div style={{position:"absolute"}}>
          <img src="https://i.stack.imgur.com/AR3kw.png" style={{zIndex:1, position:"absolute"}}/>
          <iframe
              src="https://www.youtube.com/embed/TdFL1qZ8-dg"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              style={{zIndex: -1,position: 'relative', width:'350px' ,left:'53px',height:'670px' ,top:'29px'}}></iframe>
        </div>
      </div>
    // <iframe {...props} ref={setContentRef}  width="380" height="755" src="https://poplme.co/7BRzvEfO" >
    //   {mountNode && createPortal(children, mountNode)}
    // </iframe>

  )
}

export default CustomIframe;