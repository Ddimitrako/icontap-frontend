import { Box, Flex, FormHelperText, FormLabel, Input, InputGroup, Stack, Text, Textarea } from '@chakra-ui/react';
import Footer from 'components/footer/FooterAdmin';
import { hostNameStorage } from 'Helpers/App';
import React from 'react'
import { SocialButton } from 'views/admin/main/account/billing/components/EditCardModal/EditCardModal';
import Cover from './Cover';

const ProfileView = ({ card, getCard, avatar, setavatar, avatarRadius = 70, cover, setcover, name, bio, job, company, socials, socialMaxW = '100%' }) => {
    return (
        <>
            <Cover avatarRadius={avatarRadius} avatar={avatar} setavatar={setavatar} cover={cover} setcover={setcover} />


            <Stack spacing={3}>
                <Text focusBorderColor='none' style={{ width: '100%', textAlign: 'center', fontSize: '24px', fontWeight: '600' }}>{name}</Text>
                <Text focusBorderColor='none' style={{ width: '100%', textAlign: 'center' }}>{bio}</Text>
            </Stack>

            <Box style={{ overflow: 'hidden', marginBottom: '100px', marginTop: '50px', marginLeft: 'auto', marginRight: 'auto', maxWidth: socialMaxW }}>
                {socials?.map((social, index) => {
                    // console.log(social);
                    return <SocialButton imgUrl={social.imgUrl} url={social.link} title={social.title} key={index} />
                }
                )}
            </Box>
            <Footer />
        </>
    )
}

export default ProfileView;