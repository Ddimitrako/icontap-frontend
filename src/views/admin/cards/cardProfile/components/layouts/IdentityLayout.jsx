import { Avatar, Box, Text } from '@chakra-ui/react';
import { hostNameStorage } from 'Helpers/App';
import React from 'react';
import { getTextContactItems } from './layoutUtils';

const IdentityLayout = ({ card, socials, hideFooter, avatarRadius = 64 }) => {
    const avatarUrl = card?.images?.img_profile?.url ?? card?.images?.img_profile ?? '/static/media/profile.svg';
    const backgroundUrl = card?.images?.img_background?.url ?? card?.images?.img_background ?? '';
    const contactItems = getTextContactItems(socials);

    return (
        <Box
            className={hideFooter ? '' : 'zoomed'}
            style={{
                minHeight: '100%',
                width: '100%',
                backgroundColor: '#101820',
                backgroundImage: backgroundUrl ? `linear-gradient(rgba(16,24,32,0.86), rgba(16,24,32,0.92)), url(${backgroundUrl})` : 'linear-gradient(135deg, #101820 0%, #203443 100%)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                padding: '32px 24px 42px',
                color: '#f5efe7'
            }}
        >
            <Box style={{ maxWidth: '420px', margin: '0 auto', border: '1px solid rgba(255,255,255,0.18)', borderRadius: '28px', overflow: 'hidden', backgroundColor: 'rgba(255,255,255,0.04)' }}>
                <Box style={{ padding: '26px 24px 18px', borderBottom: '1px solid rgba(255,255,255,0.12)' }}>
                    <Text style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.2em', color: '#c0aa8a', marginBottom: '18px', wordBreak: 'break-word', overflowWrap: 'anywhere' }}>
                        {card?.profile?.name}
                    </Text>
                    <Box style={{ display: 'flex', alignItems: 'center', gap: '16px', minWidth: 0 }}>
                        <Avatar src={avatarUrl} name={card?.profile?.name} width={`${avatarRadius * 2}px`} height={`${avatarRadius * 2}px`} />
                        <Box style={{ minWidth: 0, flex: 1 }}>
                            {!!card?.profile?.job_title && <Text style={{ fontSize: '14px', color: '#d7c2a4', marginTop: '8px' }}>{card.profile.job_title}</Text>}
                            {!!card?.profile?.company && <Text style={{ fontSize: '14px', color: '#f5efe7', opacity: 0.82, marginTop: '2px' }}>{card.profile.company}</Text>}
                        </Box>
                    </Box>
                </Box>
                <Box style={{ padding: '22px 24px 28px' }}>
                    {!!card?.profile?.bio && (
                        <Text style={{ fontSize: '16px', lineHeight: 1.75, marginBottom: '24px', color: '#f4eee5' }}>
                            {card.profile.bio}
                        </Text>
                    )}
                    {contactItems.length > 0 && (
                        <Box style={{ display: 'grid', gap: '12px', marginBottom: '24px' }}>
                            {contactItems.map((item) => (
                                <Box key={item.label} style={{ borderTop: '1px solid rgba(255,255,255,0.12)', paddingTop: '12px' }}>
                                    <Text style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.18em', color: '#c0aa8a', marginBottom: '4px' }}>
                                        {item.label}
                                    </Text>
                                    <Text style={{ fontSize: '15px', color: '#f4eee5', wordBreak: 'break-word' }}>
                                        {item.value}
                                    </Text>
                                </Box>
                            ))}
                        </Box>
                    )}
                    <a
                        href={card?.profile?.vcard ? `${hostNameStorage}/${card.profile.vcard}` : '#'}
                        className={'Performance-black-btn'}
                        style={{ display: 'inline-block', backgroundColor: '#c0aa8a', color: '#101820' }}
                    >
                        Save Contact
                    </a>
                </Box>
            </Box>
        </Box>
    );
};

export default IdentityLayout;
