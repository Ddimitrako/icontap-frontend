import { FormHelperText, FormLabel, Input, Stack, Textarea } from '@chakra-ui/react';
import { hostNameStorage } from 'Helpers/App';
import React from 'react'
import Cover from './Cover';

const ProfileView = ({ card, avatar, setavatar, avatarRadius, cover, setcover, name, bio, job, company, socials }) => {
    return (
        <>
            <Cover avatarRadius={80} avatar={avatar} setavatar={setavatar} cover={cover} setcover={setcover} />

            <Stack spacing={3}>
                <FormLabel>Name</FormLabel>
                <Input variant='filled' caption={'Name'} value={name} readOnly />
                <FormHelperText>Type text.</FormHelperText>
                <FormLabel>Bio</FormLabel>
                <Textarea variant='filled' caption={'Bio'} value={bio} readOnly />
                <FormHelperText>Type text.</FormHelperText>
                <FormLabel>Job Title</FormLabel>
                <Input variant='filled' caption={'Job title'} value={job} readOnly />
                <FormHelperText>Type text.</FormHelperText>
                <FormLabel>Company</FormLabel>
                <Input variant='filled' caption={'Company'} value={company} readOnly />
                <FormHelperText>Type text.</FormHelperText>
            </Stack>
        </>
    )
}

export default ProfileView;