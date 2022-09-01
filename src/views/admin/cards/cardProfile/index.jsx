/*!
  _   _  ___  ____  ___ ________  _   _   _   _ ___   ____  ____   ___  
 | | | |/ _ \|  _ \|_ _|__  / _ \| \ | | | | | |_ _| |  _ \|  _ \ / _ \ 
 | |_| | | | | |_) || |  / / | | |  \| | | | | || |  | |_) | |_) | | | |
 |  _  | |_| |  _ < | | / /| |_| | |\  | | |_| || |  |  __/|  _ <| |_| |
 |_| |_|\___/|_| \_\___/____\___/|_| \_|  \___/|___| |_|   |_| \_\\___/ 
                                                                                                                                                                                                                                                                                                                                       
=========================================================
* Horizon UI Dashboard PRO - v1.0.0
=========================================================

* Product Page: https://www.horizon-ui.com/pro/
* Copyright 2022 Horizon UI (https://www.horizon-ui.com/)

* Designed and Coded by Simmmple

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

import React from "react";

// Chakra imports
import {
    Box,
    Flex,
    Grid,
    Text,
    useColorModeValue,
    SimpleGrid, Button, FormControl,
} from "@chakra-ui/react";

// Custom components
import Banner from "views/admin/cards/cardProfile/components/Banner";
import TableLastOffer from "views/admin/cards/cardProfile/components/TableLastOffer";
import Auction from "views/admin/cards/cardProfile/components/Auction";
import Description from "views/admin/cards/cardProfile/components/Description";
import NFT from "components/card/NFT";
import Card from "components/card/Card.js";

// Assets
import Nft2 from "assets/img/cards/Nft2.png";
import Nft4 from "assets/img/cards/Nft4.png";
import Nft5 from "assets/img/cards/Nft5.png";
import Nft6 from "assets/img/cards/Nft6.png";
import Debit from "assets/img/dashboards/Debit.png";
import Avatar1 from "assets/img/avatars/avatar1.png";
import Avatar2 from "assets/img/avatars/avatar2.png";
import Avatar3 from "assets/img/avatars/avatar3.png";
import Avatar4 from "assets/img/avatars/avatar4.png";
import AvatarSimmmple from "assets/img/avatars/avatarSimmmple.png";
import tableDataLastOffer from "views/admin/cards/cardProfile/variables/tableDataLastOffer.json";
import {tableColumnsLastOffer} from "views/admin/cards/cardProfile/variables/tableColumnsLastOffer";
import Notifications from "../../main/profile/overview/components/Notifications";
import InputField from "../../../../components/fields/InputField";
import TextField from "../../../../components/fields/TextField";

export default function Page() {
    const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
    const textColorSecondary = "secondaryGray.600";
    const textColor = useColorModeValue("secondaryGray.900", "white");
    // Chakra Color Mode
    return (
        <Box pt={{base: "180px", md: "80px", xl: "80px"}}>
            {/* Main Fields */}
            <Grid
                mb='20px'
                maxW='100%'
                gridTemplateColumns={{
                    base: "1fr",
                    lg: "1fr 1fr",
                    "2xl": "1fr 0.95fr",
                }}
                gap={{base: "20px", xl: "20px"}}
                display={{base: "block", lg: "grid"}}>
                <Flex flexDirection='column' gridArea='1 / 1 / 2 / 2'>

                    <FormControl>
      <Card>
        <Flex direction='column' mb='40px' ms='10px'>
          <Text fontSize='xl' color={textColorPrimary} fontWeight='bold'>
            Card Info
          </Text>
        </Flex>
        <SimpleGrid
          columns={{ sm: 1, md: 2 }}
          spacing={{ base: "20px", xl: "20px" }}>

          <InputField
            mb='25px'
            id='last_name'
            label='Full Name'
            placeholder='John kehas'
          />
        </SimpleGrid>
        <TextField
          id='about'
          label='Bio'
          h='100px'
          placeholder='Tell something about yourself in 150 characters!'
        />
        <Button
          variant='brand'
          minW='183px'
          fontSize='sm'
          fontWeight='500'
          ms='auto'>
          Save changes
        </Button>
      </Card>
    </FormControl>
                </Flex>
                <Flex flexDirection='column' gridArea='1 / 2 / 2 / 3' pt='60px'>
                    <Notifications
                        used={25.6}
                        total={50}
                        gridArea={{
                            base: "3 / 1 / 4 / 2",
                            lg: "2 / 1 / 3 / 3",
                            "2xl": "1 / 3 / 2 / 4",
                        }}
                    />

                </Flex>
            </Grid>
            


            {/* Delete Product */}
        </Box>
    );
}
