import { Avatar, Box, Stack, Text } from '@chakra-ui/react';
import { hostNameStorage } from 'Helpers/App';
import React from 'react';

const ExecutiveLayout = ({ card, hideFooter, avatarRadius = 68 }) => {
    const avatarUrl = card?.images?.img_profile?.url ?? card?.images?.img_profile ?? '/static/media/profile.svg';
    const backgroundUrl = card?.images?.img_background?.url ?? card?.images?.img_background ?? '';

    return (
        <Box
            className={hideFooter ? '' : 'zoomed'}
            style={{
                minHeight: '100%',
                width: '100%',
                backgroundColor: '#f3efe7',
                backgroundImage: backgroundUrl ? `linear-gradient(rgba(243,239,231,0.9), rgba(243,239,231,0.96)), url(${backgroundUrl})` : 'none',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                padding: '36px 28px 48px',
            }}
        >
            <Box style={{ maxWidth: '420px', margin: '0 auto', border: '1px solid #d6cabb', backgroundColor: 'rgba(255,255,255,0.8)', padding: '28px 24px 32px' }}>
                <Stack spacing={4} align='center'>
                    <Avatar src={avatarUrl} name={card?.profile?.name} width={`${avatarRadius * 2}px`} height={`${avatarRadius * 2}px`} />
                    <Text style={{ fontSize: '13px', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#8a7460', textAlign: 'center' }}>
                        Personal Card
                    </Text>
                    <Text style={{ fontSize: '30px', fontWeight: 700, color: '#221d18', textAlign: 'center', lineHeight: 1.1 }}>
                        {card?.profile?.name}
                    </Text>
                    {!!card?.profile?.job_title && (
                        <Text style={{ fontSize: '16px', fontWeight: 600, color: '#54483e', textAlign: 'center' }}>
                            {card.profile.job_title}
                        </Text>
                    )}
                    {!!card?.profile?.company && (
                        <Text style={{ fontSize: '15px', color: '#8a7460', textAlign: 'center' }}>
                            {card.profile.company}
                        </Text>
                    )}
                    {!!card?.profile?.bio && (
                        <Text style={{ fontSize: '15px', color: '#40362d', textAlign: 'center', lineHeight: 1.7 }}>
                            {card.profile.bio}
                        </Text>
                    )}
                    <Box style={{ width: '100%', borderTop: '1px solid #d6cabb', paddingTop: '20px', marginTop: '10px' }}>
                        <a
                            href={card?.profile?.vcard ? `${hostNameStorage}/${card.profile.vcard}` : '#'}
                            className={'Performance-black-btn'}
                            style={{ display: 'inline-block', width: '100%', textAlign: 'center' }}
                        >
                            Save Contact
                        </a>
                    </Box>
                </Stack>
            </Box>
        </Box>
    );
};

export default ExecutiveLayout;
