import {
  Box,
  Button,
  Icon,
  Text,
  useColorModeValue,
  SimpleGrid,
  Tabs,
  TabPanels,
  TabPanel,
} from "@chakra-ui/react";
import PerformanceCard from "./components/Card";
import { HSeparator } from "components/separator/Separator";
import axios from "axios";
import {
  MdAddCircle,
  MdVisibility,
} from "react-icons/md";
import { useEffect } from "react";
import { useContext } from "react";
import { MeContext } from "Helpers/Auth";
import { useState } from "react";
import { hostName } from "Helpers/App";
import { useParams } from "react-router-dom";
export default function Collection(props) {

  const [Me] = useContext(MeContext);

  const [firstTime, setFirstTime] = useState(true);
  const [loading, setloading] = useState(true);
  const [loadingCreate, setloadingCreate] = useState(true);

  const paleGray = useColorModeValue("secondaryGray.400", "whiteAlpha.100");

  const [cards, setCards] = useState([]);

  let panelCards = (
    <SimpleGrid columns={{ base: 1, md: 2, xl: 4 }} gap='20px'>
      {!loading && cards?.length === 0 &&
      <span>No available physical card, only link. </span>
      }
      {!loading ? cards.map((card, index) =>
        <PerformanceCard card={card} key={index} getcards={()=>getCards()} />
      ) : <Button isLoading
        loadingText="Please wait"
        variant="transparent-with-icon"
        spinnerPlacement="start"></Button>}
    </SimpleGrid>
  );

  let { userId } = useParams();
  const statedUser=props?.history?.location?.state?.user;
  const currUserId=userId??Me.id;

  function getCards() {
    setloading(true);
    axios({
      method: 'get',
      url: `${hostName}/user/${currUserId}/cards`
    }).then((response) => {
      // console.log(response);
      setCards(response.data.data);
    }).catch((err) => {
      // console.log(err.response);
    }).finally(() => {
      setloading(false);
      setloadingCreate(false);
    })
  }

  useEffect(() => {
    if (Me.id && firstTime) {
      setFirstTime(false);
      getCards();
    }
  }, [Me, firstTime]);

  function createCard() {
    if (!currUserId) {
      return;
    }

    setloadingCreate(true);
    axios({
      method: 'post',
      url: `${hostName}/card`,
      data: {
        "title": `Dummy card ${Math.random()}`,
        "is_personal": true,
        "owner": currUserId,
      }
    }).then((response => {
      // console.log(response);
      axios({
        method: 'post',
        url: `${hostName}/card/${response.data.data.code}/profile`
      }).then((response) => {
        getCards();
        // console.log(response);
      }).catch((err) => {
        // console.log(err.response);
      }).finally(() => {
        setloadingCreate(false);
      })
    })).catch((err) => {
      // console.log(err.response);
      setloadingCreate(false);
    })
  }

  return (
    <Box pt={{ base: "180px", md: "80px", xl: "80px" }} className='zoomed'>
      <Box mb='20px' display={{ base: "block", lg: "grid" }}>

      </Box>
      <Tabs variant='soft-rounded' colorScheme='brandTabs'>

        <HSeparator mb='30px' bg={paleGray} mt='0px' />

        <Text
          mt='25px'
          mb='36px'
          color='#3A3A3A'
          fontSize='2xl'
          ms='24px'
          fontWeight='700'>{(statedUser && statedUser?.id !== Me.id)?`${statedUser?.name} ${statedUser?.last_name}'s`:'Your'} Cards
        </Text>

        <Button
          onClick={createCard}
          align='center'
          justifyContent='center'
          // bg={bgButton}
          _hover={{bgColor:'black'}}
          // _focus={bgFocus}
          // _active={bgFocus}
          bgColor={'black'}
          h='37px'
          lineHeight='100%'
          borderRadius='10px'
          isLoading={loadingCreate}
          color={'white'}
          style={{
            boxShadow: '4px 4px 10px grey'
          }}
          >
          <Icon as={MdAddCircle} color={'white'} w='24px' h='24px' />
          <span style={{paddingLeft:'5px'}}>Add a new card</span>
        </Button>
        {cards?.length === 0 ? <Button
          float={'right'}
          onClick={()=>props.history.push({pathname:'/u/cards/edit/demo'})}
          align='center'
          justifyContent='center'
          ml={'10px'}
          // bg={bgButton}
          _hover={{bgColor:'black'}}
          // _focus={bgFocus}
          // _active={bgFocus}
          color={'white'}
          bgColor={'black'}
          h='37px'
          lineHeight='100%'
          borderRadius='10px'
          isLoading={loadingCreate}
        >
          <Icon as={MdVisibility} color={'white'} w='24px' h='24px' ml={'5px'} />
          <span style={{paddingLeft:'5px'}}>View demo</span>
        </Button> : ''}
        <TabPanels>
          <TabPanel px='0px'>{panelCards}</TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
}
