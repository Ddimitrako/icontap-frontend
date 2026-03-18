import { readURL } from 'Helpers/Images';
import React from 'react'

const selectImgButtonRadius = 20;

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

const Avatar = ({ styles, avatar, avatarRadius }) => (
    <div style={{
        position: 'absolute',
        width: `${avatarRadius * 2}px`,
        ...styles
    }}>
        <div style={{
            position:'relative',
            width:'100%',
            paddingTop:'100%'
        }}>

        <div style={{
            top:'0',
            left:'0',
            bottom:'0',
            right:'0',
            position: 'absolute',
            // background: 'white url(' + avatar.url + ') center cover no-repeat',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundColor: 'white',
            backgroundImage: 'url(' + avatar?.url + ')',
            backgroundPosition: 'center',
            borderRadius: `${avatarRadius}px`,
            border: 'solid white 3px',
            boxShadow: '4px 4px 10px grey',
        }}>

            </div>
        </div>
    </div>
)

const calculateImageButtonPosition = (avatarRadius) => {
    let result = (((avatarRadius * 2) / Math.sqrt(2)) - avatarRadius) / (Math.sqrt(2));
    return (avatarRadius - result) + selectImgButtonRadius;
}

const Cover = ({avatar, setavatar, avatarRadius, cover, setcover, background, setbackground, editable=false, minHeight='20%'}) => <div
style={{
    top:0,
    minHeight: `${avatarRadius*2.56}px`,
    paddingRight: '50px',
    borderBottomRightRadius: '0',
    borderBottomLeftRadius: '0',
    marginBottom: `${avatarRadius + 10}px`,
    // background: 'white url(' + cover.url + ') center cover no-repeat',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundColor:'white',
    backgroundImage:'url(' + cover?.url + ')',
    backgroundPosition:'center',
    position: 'relative',
    boxShadow: '4px 4px 10px grey',
}}
className={'Cover-el'}
>

{editable && <SelectImgButton styles={{ top: '20px', right: '20px' }} setter={setcover} />}
{/* {!editable && JSON.stringify(avatar)} */}
{/* {!editable && JSON.stringify(cover)} */}
<Avatar avatarRadius={avatarRadius} styles={{ bottom: `-${avatarRadius}px`, left: `calc(50% - ${avatarRadius}px)` }} avatar={avatar} />
{editable && <SelectImgButton setter={setavatar} styles={{ bottom: `-${calculateImageButtonPosition(avatarRadius)}px`, right: `calc(50% - ${calculateImageButtonPosition(avatarRadius)}px)` }} />}
{editable && setbackground && <SelectImgButton setter={setbackground} styles={{ bottom: '-20px', left: '20px' }} />}

</div>;

export default Cover;
