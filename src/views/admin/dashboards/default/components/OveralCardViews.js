import React from "react";

// Chakra imports
import {
  Flex,
  Box,
  Icon,
  Select,
  Text,
  useColorModeValue,
  useDisclosure,
  Image
} from "@chakra-ui/react";
import { useState } from "react";
import LineChart from "components/charts/LineChart";

// Custom components
import Card from "components/card/Card.js";
import {
  lineChartDataOverallRevenue,
  lineChartOptionsOverallRevenue,
} from "variables/charts";

// Custom components
import Statistics from "views/admin/main/account/application/components/MiniStatistics";
import IconBox from "components/icons/IconBox";

// Assets
import { MdOutlineBarChart, MdPerson, MdFileCopy } from "react-icons/md";
import { RiArrowDownSFill, RiArrowUpSFill } from "react-icons/ri";
import FakeBarChart from "assets/img/account/FakeBarChart.png";

export default function OveralCardViews(props) {
  const { ...rest } = props;

  const iconBg = useColorModeValue("secondaryGray.300", "navy.700");
  const iconColor = useColorModeValue("brand.500", "white");

  // Chakra Color Mode
  const textColor = '#3A3A3A';
  return (
    <Card
      justifyContent='center'
      align='center'
      direction='column'
      w='100%'
      mb={{ base: "20px", lg: "0px" }}
      {...rest}>
      <Flex justify='space-between' px='20px' pt='5px'>
        <Flex>
            <Statistics
                focused={true}
                bg='linear-gradient(135deg, #868CFF 0%, #4318FF 100%)'
                title={"Total Views"}
                value={iconBg}
                fontWeight='12-0'
                detail={
                  <Flex align='center'>
                    <Text color='white' fontSize='sm' fontWeight='500'>
                      Total views per card
                    </Text>
                  </Flex>
                }
                illustration={
                  <IconBox
                    w='80px'
                    h='80px'
                    bg='linear-gradient(290.56deg, #868CFF -18.35%, #4318FF 60.45%)'
                    icon={
                      <Icon
                        as={MdOutlineBarChart}
                        w='38px'
                        h='38px'
                        color='white'
                      />
                    }
                  />
                }
            />
        </Flex>
        <Flex>
          <Statistics
              title={"Unique Total Views"}
              value='1249'
              detail={
                <Flex align='center'>
                  <Icon as={RiArrowDownSFill} color='red.500' />
                  <Text color='red.500' fontSize='sm' mx='4px' fontWeight='700'>
                    -12%
                  </Text>
                  <Text
                    color='secondaryGray.600'
                    fontSize='sm'
                    fontWeight='500'>
                    Since last month
                  </Text>
                </Flex>
              }
              illustration={<Image src={FakeBarChart} />}
            />
          </Flex>
          <Flex>
            <Statistics
              title={"Activity"}
              value='1.920'
              detail={
                <Flex align='center'>
                  <Icon as={RiArrowUpSFill} color='green.500' />
                  <Text
                    color='green.500'
                    fontSize='sm'
                    mx='4px'
                    fontWeight='700'>
                    +16%
                  </Text>
                  <Text
                    color='secondaryGray.600'
                    fontSize='sm'
                    fontWeight='500'>
                    Since last month
                  </Text>
                </Flex>
              }
              illustration={
                <IconBox
                  w='80px'
                  h='80px'
                  bg={iconBg}
                  icon={
                    <Icon color={iconColor} as={MdPerson} w='38px' h='38px' />
                  }
                />
              }
            />
          </Flex>
        <Flex align='center'>
          <Flex flexDirection='column' me='20px'>
            <Text
              color={textColor}
              fontSize='34px'
              fontWeight='700'
              lineHeight='100%'>
              11889
            </Text>
            <Text
              color='secondaryGray.600'
              fontSize='sm'
              fontWeight='500'
              mt='4px'>
              Total Views
            </Text>
          </Flex>
          {/*<Flex align='center'>*/}
          {/*  <Icon as={RiArrowUpSFill} color='green.500' me='2px' />*/}
          {/*  <Text color='green.500' fontSize='sm' fontWeight='700'>*/}
          {/*    +2.45%*/}
          {/*  </Text>*/}
          {/*</Flex>*/}
        </Flex>
        <Select
          fontSize='sm'
          variant='subtle'
          defaultValue='monthly'
          width='unset'
          fontWeight='700'>
          <option value='daily'>Daily</option>
          <option value='monthly'>Monthly</option>
          <option value='yearly'>Yearly</option>
        </Select>
      </Flex>
      <Box minH='260px' mt='auto'>
        <LineChart
          chartData={lineChartDataOverallRevenue}
          chartOptions={lineChartOptionsOverallRevenue}
        />
      </Box>
    </Card>
  );
}
