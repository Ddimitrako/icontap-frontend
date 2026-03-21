import { Avatar, Box, Text } from '@chakra-ui/react';
import { hostNameStorage } from 'Helpers/App';
import React from 'react';
import { getPrimaryContactItems } from './layoutUtils';

const ContactCardLayout = ({ card, socials, hideFooter, avatarRadius = 62 }) => {
    const avatarUrl = card?.images?.img_profile?.url ?? card?.images?.img_profile ?? '/static/media/profile.svg';
    const contactItems = getPrimaryContactItems(socials);
    const description = card?.profile?.bio || card?.profile?.job_title || card?.profile?.company || 'Description';

    return (
        <Box
            className={hideFooter ? '' : 'zoomed'}
            style={{
                minHeight: '100%',
                width: '100%',
                backgroundColor: '#0d1b5a',
                borderRadius: '22px',
                overflow: 'hidden',
                position: 'relative',
                color: 'white'
            }}
        >
            <Box
                style={{
                    height: '145px',
                    background: 'linear-gradient(120deg, #ffb0b0 0%, #f5d8c7 42%, #d98bff 100%)',
                    position: 'relative'
                }}
            />
            <Box style={{ textAlign: 'center', marginTop: `-${avatarRadius}px`, padding: '0 22px 110px', position: 'relative', zIndex: 2 }}>
                <Avatar
                    src={avatarUrl}
                    name={card?.profile?.name}
                    width={`${avatarRadius * 2}px`}
                    height={`${avatarRadius * 2}px`}
                    margin='0 auto'
                    border='4px solid #f6f4ef'
                    boxShadow='0 10px 24px rgba(0,0,0,0.2)'
                />
                <Text style={{ fontSize: '26px', fontWeight: 700, marginTop: '16px', wordBreak: 'break-word', overflowWrap: 'anywhere' }}>
                    {card?.profile?.name}
                </Text>
                {!!card?.profile?.job_title && (
                    <Text style={{ fontSize: '15px', fontWeight: 600, opacity: 0.95, marginTop: '4px' }}>
                        {card.profile.job_title}
                    </Text>
                )}
                {!!card?.profile?.company && (
                    <Text style={{ fontSize: '15px', opacity: 0.82, marginTop: '2px' }}>
                        {card.profile.company}
                    </Text>
                )}

                {contactItems.length > 0 && (
                    <Box style={{ display: 'flex', justifyContent: 'center', gap: '14px', marginTop: '24px', flexWrap: 'wrap' }}>
                        {contactItems.map((item, index) => (
                            <a
                                key={`${item.title}-${index}`}
                                href={`${item?.content?.base_url ?? item?.base_url ?? ''}${item.url}`}
                                target='_blank'
                                rel='noreferrer'
                                style={{
                                    width: '52px',
                                    height: '52px',
                                    borderRadius: '999px',
                                    backgroundColor: 'white',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    boxShadow: '0 10px 18px rgba(0,0,0,0.18)'
                                }}
                            >
                                <img
                                    src={item?.imgUrl?.blobUrl ? item.imgUrl.blobUrl : `${hostNameStorage}/${item.imgUrl}`}
                                    alt={item.title}
                                    style={{ width: '22px', height: '22px', objectFit: 'contain' }}
                                />
                            </a>
                        ))}
                    </Box>
                )}
            </Box>

            <Box
                style={{
                    position: 'absolute',
                    left: '18px',
                    right: '18px',
                    bottom: '18px',
                    backgroundColor: 'white',
                    borderRadius: '18px',
                    padding: '18px 20px 22px',
                    boxShadow: '0 18px 30px rgba(0,0,0,0.22)'
                }}
            >
                <Text style={{ fontSize: '28px', fontWeight: 700, color: '#1f2e63', textAlign: 'center', wordBreak: 'break-word', overflowWrap: 'anywhere' }}>
                    About
                </Text>
                <Text style={{ fontSize: '15px', color: '#6e7899', textAlign: 'center', marginTop: '6px', minHeight: '22px' }}>
                    {description}
                </Text>
                <a
                    href={card?.profile?.vcard ? `${hostNameStorage}/${card.profile.vcard}` : '#'}
                    style={{
                        position: 'absolute',
                        right: '-8px',
                        bottom: '-8px',
                        width: '78px',
                        height: '78px',
                        borderRadius: '999px',
                        backgroundColor: '#162763',
                        color: 'white',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        textAlign: 'center',
                        fontSize: '11px',
                        fontWeight: 700,
                        textDecoration: 'none',
                        lineHeight: 1.15,
                        padding: '10px',
                        boxShadow: '0 12px 24px rgba(0,0,0,0.24)'
                    }}
                >
                    Add to Contact
                </a>
            </Box>
        </Box>
    );
};

export default ContactCardLayout;
