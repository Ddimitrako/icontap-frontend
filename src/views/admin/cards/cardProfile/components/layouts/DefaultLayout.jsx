import { Box, Stack, Text } from '@chakra-ui/react';
import { hostNameStorage, showBuyButton } from 'Helpers/App';
import React from 'react';
import { SocialButton } from 'views/admin/main/account/billing/components/EditCardModal/EditCardModal';
import Cover from '../Cover';

const DefaultLayout = ({ card, socials, hideFooter, coverMinHeight, avatarRadius = 70 }) => {
    const backgroundUrl = card?.images?.img_background?.url ?? card?.images?.img_background ?? '';
    const contentOverlap = avatarRadius + 10;

    return (
        <Box style={{
            height: '100%',
            width: '100%',
            paddingBottom: hideFooter ? '30px' : '50px',
            position: 'relative',
            textAlign: 'center'
        }}
        className={hideFooter ? '' : 'zoomed'}
        >
            <Cover
                minHeight={coverMinHeight}
                socialMaxW="60%"
                avatarRadius={avatarRadius}
                name={card.profile.name}
                bio={card.profile.bio}
                job={card.profile.job}
                company={card.profile.company}
                card={card}
                avatar={card?.images?.img_profile}
                cover={card?.images?.img_cover}
                socials={socials}
            />
            <Box style={{
                backgroundColor: 'white',
                backgroundImage: backgroundUrl ? `url(${backgroundUrl})` : 'none',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                marginTop: `-${contentOverlap}px`,
                paddingTop: `${contentOverlap}px`,
                paddingBottom: hideFooter ? '30px' : '50px',
                minHeight: '100%'
            }}>
                <Stack spacing={1}>
                    <Text style={{ width: '100%', padding: '2% 12%', textAlign: 'center', fontSize: '24px', fontWeight: '600' }}>
                        {card.profile.name}
                    </Text>
                    <Text style={{ width: '100%', padding: '2% 12%', textAlign: 'center' }}>
                        {card.profile.bio}
                    </Text>
                </Stack>
                <Box style={{ marginTop: '20px', marginBottom: '20px' }}>
                    <a
                        href={card?.profile?.vcard ? `${hostNameStorage}/${card.profile.vcard}` : '#'}
                        className={'Performance-black-btn'}
                    >
                        Save Contact
                    </a>
                </Box>
                <Box style={{
                    width: '90%',
                    maxWidth: '400px',
                    margin: '0 auto',
                    display: 'inline-block',
                    height: 'auto'
                }}>
                    <div className='wrap' style={{ display: 'flex', listStyle: 'none', height: '100%', width: '100%' }}>
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
                    </div>
                </Box>
                {showBuyButton && <Box style={{ marginTop: '50px', marginBottom: '50px', paddingBottom: hideFooter ? '100px' : '' }} />}
            </Box>
        </Box>
    );
};

export default DefaultLayout;
