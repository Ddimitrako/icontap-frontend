import React from 'react'


const dataURLToBlob = function (dataURL) {
    var BASE64_MARKER = ';base64,';
    if (dataURL.indexOf(BASE64_MARKER) == -1) {
        var parts = dataURL.split(',');
        var contentType = parts[0].split(':')[1];
        var raw = parts[1];

        return new Blob([raw], { type: contentType });
    }

    var parts = dataURL.split(BASE64_MARKER);
    var contentType = parts[0].split(':')[1];
    var raw = window.atob(parts[1]);
    var rawLength = raw.length;

    var uInt8Array = new Uint8Array(rawLength);

    for (var i = 0; i < rawLength; ++i) {
        uInt8Array[i] = raw.charCodeAt(i);
    }

    return new Blob([uInt8Array], { type: contentType });
}

function readURL(input, setter) {
    // console.log(input, input.files);
    if (input.target.files && input.target.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            // console.log(e.target.result);
            var image = new Image();
            image.onload = function (imageEvent) {

                // Resize the image
                var canvas = document.createElement('canvas'),
                    max_size = 1024,
                    width = image.width,
                    height = image.height;
                if (width > height) {
                    if (width > max_size) {
                        height *= max_size / width;
                        width = max_size;
                    }
                } else {
                    if (height > max_size) {
                        width *= max_size / height;
                        height = max_size;
                    }
                }
                canvas.width = width;
                canvas.height = height;
                canvas.getContext('2d').drawImage(image, 0, 0, width, height);
                var dataUrl = canvas.toDataURL('image/jpeg');
                var resizedImage = dataURLToBlob(dataUrl);
                setter({
                    url:dataUrl,
                    blob:resizedImage
                })
            }
            image.src = e.target.result;
        }

        reader.readAsDataURL(input.target.files[0]);
    }
}
const selectImgButtonRadius = 30;

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

const Avatar = ({ styles, avatar, avatarRadius }) => <div style={{
    width: `${avatarRadius * 2}px`,
    height: `${avatarRadius * 2}px`,
    position: 'absolute',
    // background: 'white url(' + avatar.url + ') center cover no-repeat',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundColor:'white',
    backgroundImage:'url(' + avatar.url + ')',
    backgroundPosition:'center',
    borderRadius: `${avatarRadius}px`,
    border: 'solid white 7px',
    boxShadow: '4px 4px 10px grey',
    ...styles
}}>

</div>

const calculateImageButtonPosition = (avatarRadius) => {
    let result = (((avatarRadius * 2) / Math.sqrt(2)) - avatarRadius) / (Math.sqrt(2));
    return (avatarRadius - result) + selectImgButtonRadius;
}

const Cover = ({avatar, setavatar, avatarRadius, cover, setcover, editable=false}) => <div
style={{
    minHeight: editable?'300px':'40%',
    paddingRight: '50px',
    borderBottomRightRadius: '30px',
    borderBottomLeftRadius: '30px',
    marginBottom: `${avatarRadius + 50}px`,
    // background: 'white url(' + cover.url + ') center cover no-repeat',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundColor:'white',
    backgroundImage:'url(' + cover.url + ')',
    backgroundPosition:'center',
    position: 'relative',
    boxShadow: '4px 4px 10px grey',
}}
>

{editable && <SelectImgButton styles={{ top: '20px', right: '20px' }} setter={setcover} />}
{/* {!editable && JSON.stringify(avatar)} */}
{/* {!editable && JSON.stringify(cover)} */}
<Avatar avatarRadius={avatarRadius} styles={{ bottom: `-${avatarRadius}px`, left: `calc(50% - ${avatarRadius}px)` }} avatar={avatar} />
{editable && <SelectImgButton setter={setavatar} styles={{ bottom: `-${calculateImageButtonPosition(avatarRadius)}px`, right: `calc(50% - ${calculateImageButtonPosition(avatarRadius)}px)` }} />}

</div>;

export default Cover;