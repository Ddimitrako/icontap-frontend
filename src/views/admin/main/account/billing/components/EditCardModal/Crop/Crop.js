import { Button } from '@chakra-ui/react'
import React, { useState, useCallback } from 'react'
import Cropper from 'react-easy-crop'
import './Crop.css'
import getCroppedImg from './cropImage'

export const Crop = ({setCroppedImage, onClose, img, cropShape, setisCroppable}) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [rotation, setRotation] = useState(0)
  const [zoom, setZoom] = useState(1)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels)
  }, [])

  const showCroppedImage = useCallback(async () => {
    // console.log(img, croppedAreaPixels);
    try {
      const croppedImage = await getCroppedImg(
        img,
        croppedAreaPixels,
        rotation
      )
      // console.log('donee', { croppedImage })
      setisCroppable(false)
      setCroppedImage(croppedImage)
      onClose()
    } catch (e) {
      console.error(e)
    }
  }, [croppedAreaPixels, rotation])

  return (
    <div className="App">
      <div className="crop-container">
        <Cropper
          image={img}
          crop={crop}
          zoom={zoom}
          aspect={cropShape=='rect'?16/9:1}
          onCropChange={setCrop}
          onCropComplete={onCropComplete}
          onZoomChange={setZoom}
          cropShape={cropShape}
        />
      </div>
      <div className="controls">
        <div style={{textAlign:'center'}}>ZOOM</div>
        <input
          type="range"
          value={zoom}
          min={0.1}
          max={3}
          step={0.1}
          aria-labelledby="Zoom"
          onChange={(e) => {
            setZoom(e.target.value)
          }}
          className="zoom-range"
        />
        <br />
        <div style={{ textAlign: 'center' }}>
          <button
            onClick={showCroppedImage}
            variant="contained"
            color="primary"
            className={'Icontap-black-btn'}
          >
            Show Result
          </button>
        </div>
      </div>
    </div>
  )
}

