import { Box, Text } from '@chakra-ui/react';
import { hostNameStorage } from 'Helpers/App';
import React from 'react';
import { getTextContactItems } from './layoutUtils';

const EditorialLayout = ({ card, socials, hideFooter }) => {
    const coverUrl = card?.images?.img_cover?.url ?? card?.images?.img_cover ?? '/static/media/cover.svg';
    const contactItems = getTextContactItems(socials);

    return (
        <Box
            className={hideFooter ? '' : 'zoomed'}
            style={{
                minHeight: '100%',
                width: '100%',
                backgroundColor: '#fcfaf6',
                color: '#181511'
            }}
        >
            <Box style={{ height: '220px', backgroundImage: `linear-gradient(rgba(24,21,17,0.15), rgba(24,21,17,0.15)), url(${coverUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
            <Box style={{ maxWidth: '420px', margin: '0 auto', padding: '34px 28px 46px' }}>
                <Text style={{ fontSize: '12px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#8f8171', marginBottom: '18px' }}>
                    Contact Profile
                </Text>
                <Text style={{ fontSize: '30px', fontWeight: 700, lineHeight: 1.08, marginBottom: '14px', wordBreak: 'break-word', overflowWrap: 'anywhere' }}>
                    {card?.profile?.name}
                </Text>
                {(card?.profile?.job_title || card?.profile?.company) && (
                    <Text style={{ fontSize: '17px', lineHeight: 1.5, color: '#564c42', marginBottom: '28px' }}>
                        {[card?.profile?.job_title, card?.profile?.company].filter(Boolean).join(', ')}
                    </Text>
                )}
                {!!card?.profile?.bio && (
                    <Text style={{ fontSize: '18px', lineHeight: 1.8, color: '#2e2924', marginBottom: '32px' }}>
                        {card.profile.bio}
                    </Text>
                )}
                <Box style={{ display: 'grid', gap: '12px' }}>
                    {contactItems.length > 0 && (
                        <Box style={{ borderTop: '1px solid #ded6cb', paddingTop: '18px' }}>
                            <Text style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.18em', color: '#8f8171', marginBottom: '12px' }}>
                                Details
                            </Text>
                            <Box style={{ display: 'grid', gap: '10px' }}>
                                {contactItems.map((item) => (
                                    <Box key={item.label}>
                                        <Text style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.16em', color: '#8f8171', marginBottom: '4px' }}>
                                            {item.label}
                                        </Text>
                                        <Text style={{ fontSize: '16px', color: '#2e2924', wordBreak: 'break-word' }}>
                                            {item.value}
                                        </Text>
                                    </Box>
                                ))}
                            </Box>
                        </Box>
                    )}
                    <Box style={{ borderTop: '1px solid #ded6cb', paddingTop: '18px' }}>
                        <Text style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.18em', color: '#8f8171', marginBottom: '8px' }}>
                            Contact Action
                        </Text>
                        <a
                            href={card?.profile?.vcard ? `${hostNameStorage}/${card.profile.vcard}` : '#'}
                            className={'Performance-black-btn'}
                            style={{ display: 'inline-block' }}
                        >
                            Save Contact
                        </a>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default EditorialLayout;
