import { Avatar, Box, Text } from '@chakra-ui/react';
import { hostNameStorage } from 'Helpers/App';
import React from 'react';
import { getPrimaryContactItems } from './layoutUtils';

const CityProfileLayout = ({ card, socials, hideFooter }) => {
    const coverUrl = card?.images?.img_cover?.url ?? card?.images?.img_cover ?? '/static/media/cover.svg';
    const avatarUrl = card?.images?.img_profile?.url ?? card?.images?.img_profile ?? '/static/media/profile.svg';
    const qrUrl = card?.qr_code ? `${hostNameStorage}/${card.qr_code}` : null;
    const contactItems = getPrimaryContactItems(socials);

    return (
        <Box
            className={hideFooter ? '' : 'zoomed'}
            style={{
                minHeight: '100%',
                width: '100%',
                backgroundColor: '#f7f7fb',
                padding: '18px 14px 26px'
            }}
        >
            <Box
                style={{
                    backgroundColor: 'white',
                    borderRadius: '26px',
                    overflow: 'hidden',
                    boxShadow: '0 22px 50px rgba(18, 28, 70, 0.12)',
                    maxWidth: '430px',
                    margin: '0 auto'
                }}
            >
                <Box
                    style={{
                        height: '176px',
                        backgroundImage: `linear-gradient(rgba(20,29,60,0.14), rgba(20,29,60,0.14)), url(${coverUrl})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                    }}
                />

                <Box style={{ padding: '0 24px 28px', marginTop: '-42px' }}>
                    <Avatar
                        src={avatarUrl}
                        name={card?.profile?.name}
                        width='108px'
                        height='108px'
                        margin='0 auto'
                        border='4px solid white'
                        boxShadow='0 14px 28px rgba(0,0,0,0.18)'
                    />

                    <Box style={{ textAlign: 'center', marginTop: '14px' }}>
                        <Text style={{ fontSize: '28px', fontWeight: 700, color: '#22305a', wordBreak: 'break-word', overflowWrap: 'anywhere' }}>
                            {card?.profile?.name}
                        </Text>
                        {!!card?.profile?.job_title && (
                            <Text style={{ fontSize: '15px', fontWeight: 600, color: '#4d5b82', marginTop: '4px' }}>
                                {card.profile.job_title}
                            </Text>
                        )}
                        {!!card?.profile?.company && (
                            <Text style={{ fontSize: '14px', color: '#7b84a3', marginTop: '2px' }}>
                                {card.profile.company}
                            </Text>
                        )}
                    </Box>

                    <Box style={{ display: 'grid', gridTemplateColumns: qrUrl ? 'minmax(0, 1fr) 116px' : '1fr', gap: '18px', marginTop: '28px', alignItems: 'start' }}>
                        <Box style={{ display: 'grid', gap: '12px' }}>
                            {contactItems.map((item, index) => (
                                <a
                                    key={`${item.title}-${index}`}
                                    href={`${item?.content?.base_url ?? item?.base_url ?? ''}${item.url}`}
                                    target='_blank'
                                    rel='noreferrer'
                                    style={{
                                        display: 'grid',
                                        gridTemplateColumns: '38px minmax(0, 1fr)',
                                        gap: '12px',
                                        alignItems: 'center',
                                        color: 'inherit',
                                        textDecoration: 'none'
                                    }}
                                >
                                    <Box
                                        style={{
                                            width: '38px',
                                            height: '38px',
                                            borderRadius: '999px',
                                            backgroundColor: '#2f3d6b',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }}
                                    >
                                        <img
                                            src={item?.imgUrl?.blobUrl ? item.imgUrl.blobUrl : `${hostNameStorage}/${item.imgUrl}`}
                                            alt={item.title}
                                            style={{ width: '16px', height: '16px', objectFit: 'contain', filter: 'brightness(0) invert(1)' }}
                                        />
                                    </Box>
                                    <Text style={{ fontSize: '14px', lineHeight: 1.45, color: '#44506d', wordBreak: 'break-word' }}>
                                        {item.url}
                                    </Text>
                                </a>
                            ))}
                            {!contactItems.length && (
                                <Text style={{ fontSize: '14px', color: '#66708f', lineHeight: 1.6 }}>
                                    {card?.profile?.bio || 'Add contact details to populate this layout.'}
                                </Text>
                            )}
                        </Box>

                        {qrUrl && (
                            <Box
                                style={{
                                    backgroundColor: '#ffffff',
                                    borderRadius: '18px',
                                    boxShadow: '0 16px 32px rgba(18, 28, 70, 0.12)',
                                    padding: '10px'
                                }}
                            >
                                <img
                                    src={qrUrl}
                                    alt='QR code'
                                    style={{ width: '100%', display: 'block', borderRadius: '12px' }}
                                />
                            </Box>
                        )}
                    </Box>

                    <a
                        href={card?.profile?.vcard ? `${hostNameStorage}/${card.profile.vcard}` : '#'}
                        className='Performance-black-btn'
                        style={{
                            display: 'block',
                            width: '100%',
                            marginTop: '28px',
                            textAlign: 'center',
                            borderRadius: '999px',
                            background: 'linear-gradient(90deg, #3f6ef6 0%, #2f58df 100%)'
                        }}
                    >
                        Add to contacts
                    </a>
                </Box>
            </Box>
        </Box>
    );
};

export default CityProfileLayout;
