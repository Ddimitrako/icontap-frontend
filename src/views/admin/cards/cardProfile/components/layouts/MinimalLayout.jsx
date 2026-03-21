import { Avatar, Box, Stack, Text } from '@chakra-ui/react';
import { hostNameStorage } from 'Helpers/App';
import React from 'react';
import { SocialButton } from 'views/admin/main/account/billing/components/EditCardModal/EditCardModal';

const MinimalLayout = ({ card, socials, hideFooter, avatarRadius = 70 }) => {
    const avatarUrl = card?.images?.img_profile?.url ?? card?.images?.img_profile ?? '/static/media/profile.svg';
    const backgroundUrl = card?.images?.img_background?.url ?? card?.images?.img_background ?? '';

    return (
        <Box
            className={hideFooter ? '' : 'zoomed'}
            style={{
                minHeight: '100%',
                width: '100%',
                padding: '32px 24px 48px',
                textAlign: 'center',
                backgroundColor: '#f7f4ef',
                backgroundImage: backgroundUrl ? `linear-gradient(rgba(247,244,239,0.92), rgba(247,244,239,0.96)), url(${backgroundUrl})` : 'none',
                backgroundSize: 'cover',
                backgroundPosition: 'center'
            }}
        >
            <Stack spacing={4} align='center'>
                <Avatar src={avatarUrl} name={card?.profile?.name} width={`${avatarRadius * 2}px`} height={`${avatarRadius * 2}px`} />
                <Text style={{ fontSize: '28px', fontWeight: 700, color: '#1f1c18' }}>{card?.profile?.name}</Text>
                {!!card?.profile?.job_title && <Text style={{ fontSize: '15px', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#7b6d5d' }}>{card.profile.job_title}</Text>}
                {!!card?.profile?.bio && <Text style={{ fontSize: '16px', color: '#473f37', maxWidth: '320px' }}>{card.profile.bio}</Text>}
                {!!card?.profile?.company && <Text style={{ fontSize: '15px', color: '#7b6d5d' }}>{card.profile.company}</Text>}
                <a
                    href={card?.profile?.vcard ? `${hostNameStorage}/${card.profile.vcard}` : '#'}
                    className={'Performance-black-btn'}
                >
                    Save Contact
                </a>
                <Box style={{ width: '100%', maxWidth: '360px', display: 'grid', gap: '12px', marginTop: '12px' }}>
                    {socials && socials.length > 0 && socials.map((social, index) => (
                        <Box key={index} style={{ display: 'flex', justifyContent: 'center' }}>
                            <SocialButton
                                preview
                                imgUrl={social?.imgUrl}
                                blobUrl={social?.imgUrl?.blobUrl}
                                base_url={social?.content?.base_url ?? social?.base_url}
                                url={social?.url}
                                title={social?.title}
                            />
                        </Box>
                    ))}
                </Box>
            </Stack>
        </Box>
    );
};

export default MinimalLayout;
