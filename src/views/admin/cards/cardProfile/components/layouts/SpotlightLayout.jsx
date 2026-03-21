import { Avatar, Box, Text } from '@chakra-ui/react';
import { hostNameStorage } from 'Helpers/App';
import React from 'react';
import { SocialButton } from 'views/admin/main/account/billing/components/EditCardModal/EditCardModal';

const SpotlightLayout = ({ card, socials, hideFooter, avatarRadius = 70 }) => {
    const coverUrl = card?.images?.img_cover?.url ?? card?.images?.img_cover ?? '/static/media/cover.svg';
    const backgroundUrl = card?.images?.img_background?.url ?? card?.images?.img_background ?? '';
    const avatarUrl = card?.images?.img_profile?.url ?? card?.images?.img_profile ?? '/static/media/profile.svg';

    return (
        <Box
            className={hideFooter ? '' : 'zoomed'}
            style={{
                minHeight: '100%',
                width: '100%',
                backgroundColor: '#111111',
                backgroundImage: backgroundUrl ? `linear-gradient(rgba(17,17,17,0.62), rgba(17,17,17,0.88)), url(${backgroundUrl})` : 'linear-gradient(160deg, #1d1d1d 0%, #353535 100%)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                paddingBottom: '40px'
            }}
        >
            <Box style={{ height: '180px', backgroundImage: `url(${coverUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
            <Box style={{ width: '86%', margin: `-${avatarRadius}px auto 0`, backgroundColor: 'rgba(255,255,255,0.94)', borderRadius: '28px', padding: '24px 20px 28px', boxShadow: '0 24px 48px rgba(0,0,0,0.28)' }}>
                <Box style={{ display: 'flex', justifyContent: 'center' }}>
                    <Avatar src={avatarUrl} name={card?.profile?.name} width={`${avatarRadius * 2}px`} height={`${avatarRadius * 2}px`} border='4px solid white' />
                </Box>
                <Text style={{ marginTop: '16px', textAlign: 'center', fontSize: '26px', fontWeight: 700, color: '#161616' }}>{card?.profile?.name}</Text>
                {(card?.profile?.job_title || card?.profile?.company) && (
                    <Text style={{ textAlign: 'center', marginTop: '6px', color: '#5d5d5d', fontWeight: 600 }}>
                        {[card?.profile?.job_title, card?.profile?.company].filter(Boolean).join(' @ ')}
                    </Text>
                )}
                {!!card?.profile?.bio && <Text style={{ textAlign: 'center', marginTop: '14px', color: '#2e2e2e' }}>{card.profile.bio}</Text>}
                <Box style={{ textAlign: 'center', marginTop: '22px', marginBottom: '18px' }}>
                    <a
                        href={card?.profile?.vcard ? `${hostNameStorage}/${card.profile.vcard}` : '#'}
                        className={'Performance-black-btn'}
                    >
                        Save Contact
                    </a>
                </Box>
                <Box style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
                    {socials && socials.length > 0 && socials.map((social, index) => (
                        <SocialButton
                            imgUrl={social?.imgUrl}
                            blobUrl={social?.imgUrl?.blobUrl}
                            base_url={social?.content?.base_url ?? social?.base_url}
                            url={social?.url}
                            title={social?.title}
                            key={index}
                        />
                    ))}
                </Box>
            </Box>
        </Box>
    );
};

export default SpotlightLayout;
