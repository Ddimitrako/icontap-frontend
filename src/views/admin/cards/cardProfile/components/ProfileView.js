import { FormHelperText, FormLabel, Input, InputGroup, Stack, Textarea } from '@chakra-ui/react';
import { hostNameStorage } from 'Helpers/App';
import React from 'react'
import { SocialButton } from 'views/admin/main/account/billing/components/EditCardModal/EditCardModal';
import Cover from './Cover';

const ProfileView = ({ card, getCard, avatar, setavatar, avatarRadius=80, cover, setcover, name, bio, job, company, socials }) => {
    return (
        <>
            <Cover avatarRadius={avatarRadius} avatar={avatar} setavatar={setavatar} cover={cover} setcover={setcover} />

            <Stack spacing={3}>
                <InputGroup>
                    <FormLabel>Name</FormLabel>
                </InputGroup>
                <InputGroup>
                    <Input variant='filled' caption={'Name'} value={name} readOnly />
                </InputGroup>
                <InputGroup>
                    <FormHelperText>Type text.</FormHelperText>
                </InputGroup>
                <InputGroup>
                    <FormLabel>Bio</FormLabel>
                </InputGroup>
                <InputGroup>
                    <Textarea variant='filled' caption={'Bio'} resize={'none'} value={bio} readOnly />
                </InputGroup>
                <InputGroup>
                    <FormHelperText>Type text.</FormHelperText>
                </InputGroup>
                <InputGroup>
                    <FormLabel>Job Title</FormLabel>
                </InputGroup>
                <InputGroup>
                    <Input variant='filled' caption={'Job title'} value={job} readOnly />
                </InputGroup>
                <InputGroup>
                    <FormHelperText>Type text.</FormHelperText>
                </InputGroup>
                <InputGroup>
                    <FormLabel>Company</FormLabel>
                </InputGroup>
                <InputGroup>
                    <Input variant='filled' caption={'Company'} value={company} readOnly />
                </InputGroup>
                <InputGroup>
                    <FormHelperText>Type text.</FormHelperText>
                </InputGroup>
            </Stack>

            {socials?.map((social, index) => {
                console.log(social);
                return <SocialButton imgUrl={social.imgUrl} url={social.link} key={index} />
            }
            )}
        </>
    )
}

export default ProfileView;