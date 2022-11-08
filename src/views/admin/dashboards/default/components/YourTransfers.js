import React from "react";

// Chakra imports
import { Button, Icon, Text, useColorModeValue } from "@chakra-ui/react";

// Custom components
import Card from "components/card/Card.js";
import Transfer from "components/dataDisplay/Transfer";
// Assets
import avatar1 from "assets/img/avatars/avatar1.png";
import avatar2 from "assets/img/avatars/avatar2.png";
import avatar3 from "assets/img/avatars/avatar3.png";
import avatar4 from "assets/img/avatars/avatar4.png";
import { BsArrowRight } from "react-icons/bs";

export default function YourTransfers(props) {
  const { ...rest } = props;

  // Chakra Color Mode
  const textColor = '#3A3A3A';
  const brandColor = useColorModeValue("brand.500", "white");
  return (
    <Card
      justifyContent='center'
      direction='column'
      w='70%'
      mb={{ base: "20px", lg: "0px" }}
      pb='20px'
      {...rest}>
      <Text
        color={textColor}
        fontSize='lg'
        fontWeight='700'
        lineHeight='100%'
        mb='26px'>
        Total views/url
      </Text>
      <Transfer
        mb='20px'
        name='Facebook'

        sum='50'
        avatar={avatar1}
      />
      <Transfer
        mb='20px'
        name='Twitter'

        sum='27'
        avatar={avatar2}
      />
      <Transfer
        mb='20px'
        name='Instagram'

        sum='157'
        avatar={avatar3}
      />
      <Transfer
        mb='20px'
        name='Youtube'

        sum='92'
        avatar={avatar4}
      />

      <Button
        p='0px'
        ms='auto'
        variant='no-hover'
        bg='transparent'
        my={{ sm: "1.5rem", lg: "0px" }}>
        <Text
          fontSize='sm'
          color={brandColor}
          fontWeight='bold'
          cursor='pointer'
          transition='all .3s ease'
          my={{ sm: "1.5rem", lg: "0px" }}
          _hover={{ me: "4px" }}>
          View all
        </Text>
        <Icon
          as={BsArrowRight}
          w='18px'
          h='18px'
          color={brandColor}
          transition='all .3s ease'
          ms='.3rem'
          cursor='pointer'
          _hover={{ transform: "translate(4px)" }}
        />
      </Button>
    </Card>
  );
}
