import { Box, Button, Flex, FormHelperText, FormLabel, Input, InputGroup, Stack, Text, Textarea } from '@chakra-ui/react';
import Footer from 'components/footer/FooterAdmin';
import { hostName } from 'Helpers/App';
import { hostNameStorage,showBuyButton } from 'Helpers/App';
import React from 'react';
import { useEffect ,useState} from 'react';
import { Link } from 'react-router-dom';
import { SocialButton } from 'views/admin/main/account/billing/components/EditCardModal/EditCardModal';
import Cover from './Cover';

// const ProfileView = ({ card, getCard, avatar, setavatar, avatarRadius = 70, cover, setcover, name, bio, job, company, socials && socials.length>0 && , socialMaxW = '100%' }) => {
const ProfileView = ({ card, socials, hideFooter, coverMinHeight, avatarRadius = 70 }) => {

    useEffect(()=>{
         // console.log('test',hideBuyButton);
    },[card]);
    
    return card?.profile ? (
        <Box style={{
            height: '100%', width: '100%',
            // boxShadow: '4px 4px 10px grey',
            paddingBottom: hideFooter?'30px':'50px',
            position: 'relative',
            textAlign: 'center'
        }}
        className={hideFooter?'':'zoomed'}
        >
            <Cover minHeight={coverMinHeight} socialMaxW="60%" avatarRadius={avatarRadius} name={card.profile.name} bio={card.profile.bio} job={card.profile.job} company={card.profile.company} card={card} avatar={card?.images?.img_profile} cover={card?.images?.img_cover} socials={socials} />
            <Stack spacing={1}>
                <Text focusBorderColor='none' style={{ width: '100%', padding:'2% 12%', textAlign: 'center', fontSize: '24px', fontWeight: '600' }}>{card.profile.name}</Text>
                <Text focusBorderColor='none' style={{ width: '100%', padding:'2% 12%', textAlign: 'center' }}>{card.profile.bio}</Text>
            </Stack>
            <Box
                style={{
                    marginTop: '20px',
                    marginBottom: '20px'
                }}
            >
                <a href={card?.profile?.vcard?`${hostNameStorage}/${card.profile.vcard}`:'#'}
                    className={'Icontap-black-btn'}
                >Save Contact</a>
            </Box>
            <Box style={{
                width: '90%',
                maxWidth:'400px',
                margin: '0 auto',
                display: 'inline-block',
                height: 'auto'
            }}><div className='wrap' style={{
                display:'flex',
                listStyle:'none',
                height:'100%',
                width:'100%'
            }}>

                    {socials && socials.length > 0 && socials?.map((social, index) => {
                        // console.log('social', social);
                        return <SocialButton imgUrl={social?.imgUrl} blobUrl={social?.imgUrl.blobUrl} base_url={social?.content?.base_url??social?.base_url} url={social?.url} title={social?.title} key={index} />
                    }
                    )}
                </div>
            </Box>
            {showBuyButton && <Box
                style={{
                    marginTop: '50px',
                    marginBottom: '50px',
                    paddingBottom: hideFooter?'100px':''
                }}
            >
                <a href={`https://icontap.gr/shop-2/`}
                    className={'Icontap-white-btn'}
                >Buy your icontap</a>

            </Box>}
            <Box
                style={{
                    position: 'absolute',
                    bottom: '0',
                    left: '0',
                    textAlign:'center',
                    width:'100%'
                }}
            >
                {!hideFooter && <p className='Icontap-copyright'>Icontap © 2022</p>}
            </Box>
        </Box>
    ) : <></>;

    // return (
    //     <>
    //         <Cover avatarRadius={avatarRadius} avatar={avatar} setavatar={setavatar} cover={cover} setcover={setcover} />


    //         <Stack spacing={3}>
    //             <Text focusBorderColor='none' style={{ width: '100%', textAlign: 'center', fontSize: '24px', fontWeight: '600' }}>{name}</Text>
    //             <Text focusBorderColor='none' style={{ width: '100%', textAlign: 'center' }}>{bio}</Text>
    //         </Stack>

    //         <Box style={{ overflow: 'hidden', marginBottom: '100px', marginTop: '50px', marginLeft: 'auto', marginRight: 'auto', maxWidth: socialMaxW }}>
    //             {socials && socials.length>0 && ?.map((social, index) => {
    //                 console.log(social);
    //                 return <SocialButton imgUrl={social.imgUrl} url={social.link} title={social.title} key={index} />
    //             }
    //             )}
    //         </Box>
    //         <Footer />
    //     </>
    // )
}

export default ProfileView;