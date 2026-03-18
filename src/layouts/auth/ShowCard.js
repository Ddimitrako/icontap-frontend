import React from 'react'
import ProfileView from 'views/admin/cards/cardProfile/components/ProfileView';
import axios from "axios";
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { hostName } from 'Helpers/App';
import { Box, Button, Flex, Stack, Text } from '@chakra-ui/react';
import { useEffect } from 'react';
import DefaultAuth from "layouts/auth/types/Default";
import illustration from "assets/img/auth/auth.png";
import Footer from 'components/footer/FooterAdmin';
import { hostNameStorage } from 'Helpers/App';
import Cover from 'views/admin/cards/cardProfile/components/Cover';
import { SocialButton } from 'views/admin/main/account/billing/components/EditCardModal/EditCardModal';
import Profile from 'views/admin/main/account/settings/components/Profile';
import ReactGA from 'react-ga';

export const ShowCard = () => {

    const [loaded, setloaded] = useState(false);
    const [card, setcard] = useState({});
    const [socials, setsocials] = useState({});

    let { cardId } = useParams();

    function getProfile() {
        console.log('getProfile');
        console.log(window.location.pathname)
        axios({
            method: 'get',
            url: `${hostName}/card/${cardId}`
        }).then((response) => {
            // console.log(response);
            let tempCard=response.data.data;
            if(!tempCard?.images)
                tempCard.images={};
            tempCard.images.img_profile={ url: tempCard?.images?.img_profile?`${hostNameStorage}/${tempCard.images.img_profile }`:'/static/media/profile.svg'};
            tempCard.images.img_cover={ url: tempCard?.images?.img_cover?`${hostNameStorage}/${tempCard.images.img_cover }`:'/static/media/cover.svg'};
            tempCard.images.img_background={ url: tempCard?.images?.img_background?`${hostNameStorage}/${tempCard.images.img_background }`:''};
            setcard(tempCard);
            setsocials(parseProfileContents(tempCard));
        }).catch((err) => {
            // console.log(err.response);
        }).finally(() => {
            setloaded(true);
        })
    }

    function parseProfileContents(card) {
        // console.log('parsedSocials', card);
        let parsedSocials = [];
        card.content.forEach((c, i) => {
            ReactGA.event({
                category: window.location.pathname.toString(),
                action: c.link,
                label: c.title,
            })
            // console.log('1',c,i);
            c = { ...c, imgUrl: c?.image, title: c.title, url: c.link };
            // console.log('2',c,i);
            parsedSocials.push(c);
        });
        // console.log('parsedSocials2', parsedSocials);
        return parsedSocials;
    }

    useEffect(() => {
        ReactGA.initialize('UA-246553882-3',{ debug: true })
        ReactGA.pageview(window.location.pathname)
        getProfile();

    }, []);

    // return <DefaultAuth noIllustration>
    //     
    return (card)?(
        <Flex position='relative' h='max-content' style={{ height: '100%', width: '100%' }}>
            <Flex
                minH='100%'
                h='auto'
                w='100%'
                maxW="500px"
                mx='auto'
                justifyContent='center'
                direction='column'
                boxShadow= '4px 4px 10px grey'
                
                >
                <ProfileView card={card} socials={socials} avatarRadius={72} />
            </Flex>
        </Flex>
        // </DefaultAuth>
    ):<></>;
}

export default ShowCard;
