import React from 'react'
import ProfileView from 'views/admin/cards/cardProfile/components/ProfileView';
import axios from "axios";
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { hostName } from 'Helpers/App';
import { Box, Button, Flex } from '@chakra-ui/react';
import { useEffect } from 'react';
import DefaultAuth from "layouts/auth/types/Default";
import illustration from "assets/img/auth/auth.png";
import Footer from 'components/footer/FooterAdmin';
import { hostNameStorage } from 'Helpers/App';


const ShowCard = () => {

    const [loaded, setloaded] = useState(false);
    const [card, setcard] = useState({});
    const [socials, setsocials] = useState({});

    let { cardId } = useParams();

    function getProfile() {
        console.log('getProfile');
        axios({
            method: 'get',
            url: `${hostName}/card/${cardId}`
        }).then((response) => {
            console.log(response);
            setcard(response.data.data);
            setsocials(parseProfileContents(response.data.data));
        }).catch((err) => {
            console.log(err.response);
        }).finally(() => {
            setloaded(true);
        })
    }

    function parseProfileContents(card) {
        // console.log('parsedSocials', card);
        let parsedSocials = [];
        card.content.forEach((c, i) => {
            // console.log('1',c,i);
            c = { ...c, imgUrl: c?.image, title: c.title, url: c.link };
            // console.log('2',c,i);
            parsedSocials.push(c);
        });
        // console.log('parsedSocials2', parsedSocials);
        return parsedSocials;
    }

    useEffect(() => {
        getProfile();
    }, []);

    // return <DefaultAuth noIllustration>
    //     
    return (
        <Flex position='relative' h='max-content'>
            <Flex
                h={{
                    sm: "initial",
                    md: "unset",
                    lg: "100vh",
                    xl: "97vh",
                }}
                w='100%'
                maxW={{ md: "66%", lg: "1313px" }}
                mx='auto'
                pt={{ sm: "0", md: "0px" }}
                px={{ lg: "30px", xl: "0px" }}
                ps={{ xl: "70px" }}
                justifyContent='start'
                direction='column'>

                {!loaded ?
                    <Button isLoading
                        loadingText="Please wait"
                        variant="transparent-with-icon"
                        spinnerPlacement="start">
                    </Button>
                    :
                    <Box mx='5'>
                        <ProfileView avatarRadius={120} name={card.profile.name} bio={card.profile.bio} job={card.profile.job} company={card.profile.company} card={card} avatar={{ url: `${hostNameStorage}/${card.images.img_profile}` }} cover={{ url: `${hostNameStorage}/${card.images.img_cover}` }} socials={socials} />
                        <Footer />
                    </Box>}
            </Flex>
        </Flex>
        // </DefaultAuth>
    )
}

export default ShowCard;