// Chakra Imports
import {
    Avatar,
    Button,
    Flex,
    Icon,
    Image,
    Link,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    Text,
    useColorModeValue,
    useColorMode,
} from "@chakra-ui/react";
// Custom Components
import {SidebarResponsive} from "components/sidebar/Sidebar";
import PropTypes from "prop-types";
import React, {useEffect, useState} from "react";
// Assets
import navImage from "assets/img/layout/Navbar.png";
import {MdNotificationsNone, MdInfoOutline} from "react-icons/md";
import routes from "routes.js";
import {useHistory, useLocation, useParams} from "react-router-dom";
import {getMe} from "../../Helpers/Auth";

export default function HeaderLinks(props) {
    const {secondary} = props;
    const {colorMode, toggleColorMode} = useColorMode();
    const history = useHistory();
    // Chakra Color Mode
    const navbarIcon = useColorModeValue("gray.400", "white");
    let menuBg = useColorModeValue("white", "navy.800");
    const textColor = '#3A3A3A';
    const textColorBrand = useColorModeValue("brand.700", "brand.400");
    const ethColor = useColorModeValue("gray.700", "white");
    const borderColor = useColorModeValue("#E6ECFA", "rgba(135, 140, 189, 0.3)");
    const ethBg = useColorModeValue("secondaryGray.300", "navy.900");
    const ethBox = useColorModeValue("white", "navy.800");
    const shadow = useColorModeValue(
        "14px 17px 40px 4px rgba(112, 144, 176, 0.18)",
        "14px 17px 40px 4px rgba(112, 144, 176, 0.06)"
    );
    const borderButton = useColorModeValue("secondaryGray.500", "whiteAlpha.200");
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    useEffect(() => {

        let inter=setInterval(() => {
            setLastName(getMe()?.last_name);
            setFirstName(getMe()?.name);
            if(firstName && lastName){
                clearInterval(inter);
            }
        }, 500);

    }, []);

    return (
        <Flex
            w={{sm: "100%", md: "auto"}}
            alignItems='center'
            flexDirection='row'
            bg={menuBg}
            flexWrap={secondary ? {base: "wrap", md: "nowrap"} : "unset"}
            p='10px'
            borderRadius='30px'
            boxShadow={shadow}>
            <Flex
                bg={ethBg}
                display={secondary ? "flex" : "none"}
                borderRadius='30px'
                p='6px'
                align='center'
                me='6px'
                ms='auto'>

            </Flex>
            <SidebarResponsive routes={routes}/>

            <Menu>
                <MenuButton p='0px'>
                    <Icon
                        as={MdInfoOutline}
                        color={navbarIcon}
                        w='18px'
                        h='18px'
                        me='10px'
                        mt='6px'
                    />
                </MenuButton>
                <MenuList
                    boxShadow={shadow}
                    p='20px'
                    me={{base: "30px", md: "unset"}}
                    borderRadius='20px'
                    bg={menuBg}
                    border='none'
                    mt='22px'
                    minW={{base: "unset"}}
                    maxW={{base: "360px", md: "unset"}}>
                    <Image src={navImage} borderRadius='16px' mb='28px'/>
                    <Flex flexDirection='column'>
                        <Link w='100%' href='https://performance.gr'>
                            <Button w='100%' h='44px' mb='10px' className="btn-custom-dark-background">
                                Go to performance.gr
                            </Button>
                        </Link>

                    </Flex>
                </MenuList>
            </Menu>
            <Menu>
                <MenuButton p='0px'>
                    <Avatar
                        _hover={{cursor: "pointer"}}
                        color='white'
                        name={firstName + " " + lastName}
                        bg='black'
                        size='sm'
                        w='40px'
                        h='40px'
                    />
                </MenuButton>
                <MenuList
                    boxShadow={shadow}
                    p='0px'
                    mt='10px'
                    borderRadius='20px'
                    bg={menuBg}
                    border='none'>
                    <Flex w='100%' mb='0px'>
                        <Text
                            ps='20px'
                            pt='16px'
                            pb='10px'
                            w='100%'
                            borderBottom='1px solid'
                            borderColor={borderColor}
                            fontSize='sm'
                            fontWeight='700'
                            color={textColor}>
                            👋 &nbsp; Hey, {firstName}
                        </Text>
                    </Flex>
                    <Flex w='100%' mb='0px'>
                        <Text
                            ps='20px'
                            pt='16px'
                            pb='10px'
                            w='100%'
                            borderBottom='1px solid'
                            borderColor={borderColor}
                            fontSize='sm'
                            fontWeight='700'
                            color={textColor}
                            onClick={() => {
                                history.push('/u/dashboards/default');
                            }}>
                            Insights
                        </Text>
                    </Flex>
                    <Flex w='100%' mb='0px'>
                        <Text
                            ps='20px'
                            pt='16px'
                            pb='10px'
                            w='100%'
                            borderBottom='1px solid'
                            borderColor={borderColor}
                            fontSize='sm'
                            fontWeight='700'
                            color={textColor}
                            onClick={() => {
                                history.push('/u/cardsList/card');
                            }}>
                            Cards
                        </Text>
                    </Flex>
                    <Flex w='100%' mb='0px'>
                        <Text
                            ps='20px'
                            pt='16px'
                            pb='10px'
                            w='100%'
                            borderBottom='1px solid'
                            borderColor={borderColor}
                            fontSize='sm'
                            fontWeight='700'
                            color={textColor}
                            onClick={() => {
                                history.push('/u/main/users/admin-overview');
                            }}>
                            Admin
                        </Text>
                    </Flex>
                    <Flex w='100%' mb='0px'>
                        <Text
                            ps='20px'
                            pt='16px'
                            pb='10px'
                            w='100%'
                            borderBottom='1px solid'
                            borderColor={borderColor}
                            fontSize='sm'
                            fontWeight='700'
                            color={textColor}
                            onClick={() => {
                                history.push('/u/main/edit-socials');
                            }}>
                            Socials
                        </Text>
                    </Flex>
                    <Flex w='100%' mb='0px'>
                        <Text
                            ps='20px'
                            pt='16px'
                            pb='10px'
                            w='100%'
                            borderBottom='1px solid'
                            borderColor={borderColor}
                            fontSize='sm'
                            fontWeight='700'
                            color={textColor}
                            onClick={() => {
                                history.push('/u/main/profile/settings');
                            }}>
                            Profile
                        </Text>
                    </Flex>
                    <Flex flexDirection='column' p='10px'>
                        <MenuItem
                            _hover={{bg: "none"}}
                            _focus={{bg: "none"}}
                            color='red.400'
                            borderRadius='8px'
                            px='14px'
                            onClick={() => {
                                history.push('/u/logout');
                            }}>
                            <Text fontSize='sm'>Log out</Text>
                        </MenuItem>
                    </Flex>
                </MenuList>
            </Menu>
        </Flex>
    );
}

HeaderLinks.propTypes = {
    variant: PropTypes.string,
    fixed: PropTypes.bool,
    secondary: PropTypes.bool,
    onOpen: PropTypes.func,
};
