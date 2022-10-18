import React from "react";

// Chakra imports
import { Flex, Badge, Text, useColorModeValue } from "@chakra-ui/react";

export default function SessionBadge(props) {
  const { detail, name, status, color, ...rest } = props;

  const textColor = '#3A3A3A';
  return (
    <Flex justifyContent='space-between' alignItems='center' w='100%' {...rest}>
      <Text color={textColor} fontSize='md' me='6px' fontWeight='500'>
        {name}
      </Text>
      <Flex align='center' ms='auto'>
        <Text
          color='secondaryGray.600'
          fontSize='sm'
          fontWeight='400'
          me='40px'>
          {detail}
        </Text>
        <Badge
          colorScheme={color}
          color={`${color}.500`}
          px='24px'
          fontSize='sm'>
          {status}
        </Badge>
      </Flex>
    </Flex>
  );
}
