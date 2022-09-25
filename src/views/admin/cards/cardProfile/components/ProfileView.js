import { Box, Button, Flex, FormHelperText, FormLabel, Input, InputGroup, Stack, Text, Textarea } from '@chakra-ui/react';
import Footer from 'components/footer/FooterAdmin';
import { hostName } from 'Helpers/App';
import { hostNameStorage } from 'Helpers/App';
import React from 'react'
import { Link } from 'react-router-dom';
import { SocialButton } from 'views/admin/main/account/billing/components/EditCardModal/EditCardModal';
import Cover from './Cover';

// const ProfileView = ({ card, getCard, avatar, setavatar, avatarRadius = 70, cover, setcover, name, bio, job, company, socials, socialMaxW = '100%' }) => {
const ProfileView = ({ card, socials, hideFooter, coverMinHeight }) => {
    return card?.profile ? (
        <Box style={{
            height: '100%', width: '100%',
            // boxShadow: '4px 4px 10px grey',
            paddingBottom: '300px',
            position: 'relative',
            textAlign: 'center'
        }}>
            <Cover minHeight={coverMinHeight} socialMaxW="60%" avatarRadius={80} name={card.profile.name} bio={card.profile.bio} job={card.profile.job} company={card.profile.company} card={card} avatar={{ url: `${hostNameStorage}/${card.images.img_profile}` }} cover={{ url: `${hostNameStorage}/${card.images.img_cover}` }} socials={socials} />
            <Stack spacing={3}>
                <Text focusBorderColor='none' style={{ width: '100%', textAlign: 'center', fontSize: '24px', fontWeight: '600' }}>{card.profile.name}</Text>
                <Text focusBorderColor='none' style={{ width: '100%', textAlign: 'center' }}>{card.profile.bio}</Text>
            </Stack>
            <Box
                style={{
                    marginTop: '50px',
                    marginBottom: '50px'
                }}
            >
            <a href={`${hostNameStorage}/${card.profile.vcard}`}
                className={'btn-custom-dark-background'}
                >Save Contract</a>
            </Box>
            <Box style={{
                width: '100%',
                margin: '0 auto',
                display: 'inline-block',
                height: 'auto'
            }}>
                {socials?.map((social, index) => {
                    return <SocialButton imgUrl={social.imgUrl} url={social.link} title={social.title} key={index} />
                }
                )}
            </Box>
            <Box
                style={{
                    position: 'absolute',
                    bottom: '0',
                    left: '0'
                }}
            >
                {!hideFooter && <Footer />}
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
    //             {socials?.map((social, index) => {
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