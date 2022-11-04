import React from "react";
// Chakra imports
import {Flex, Grid, useColorModeValue} from "@chakra-ui/react";
// Custom components
import Balance from "views/admin/dashboards/default/components/Balance";
import DailyTraffic from "views/admin/dashboards/default/components/DailyTraffic";
import MostVisitedTable from "views/admin/dashboards/default/components/MostVisitedTable";
import {VSeparator} from "components/separator/Separator";
import OverallRevenue from "views/admin/dashboards/default/components/OverallRevenue";
import ProfitEstimation from "views/admin/dashboards/default/components/ProfitEstimation";
import ProjectStatus from "views/admin/dashboards/default/components/ProjectStatus";
import YourCard from "views/admin/dashboards/default/components/YourCard";
import YourTransfers from "views/admin/dashboards/default/components/YourTransfers";
import {tableColumnsMostVisited} from "views/admin/dashboards/default/variables/tableColumnsMostVisited";
import tableDataMostVisited from "views/admin/dashboards/default/variables/tableDataMostVisited.json";
import Map from "./components/Map";
import {useEffect, useState} from "react";
import axios from "axios";
import {hostName} from "../../../../Helpers/App";
import {Doughnut} from 'react-chartjs-2';
import {Chart as ChartJS, ArcElement, Tooltip, Legend} from 'chart.js';
import { Select } from '@chakra-ui/react';
import {useParams} from "react-router-dom";
import { getMe } from "Helpers/Auth";
ChartJS.register(ArcElement, Tooltip, Legend);


export default function Default() {
    const data = {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [
            {
                label: '# of Votes',
                data: [12, 19, 3, 5, 2, 3],
                backgroundColor: [
                    'rgba(203,17,53,0.2)',
                    'rgba(25,112,170,0.2)',
                    'rgba(198,149,22,0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };
    //TODO rangeslider or calendar to select the last 365 days of data to show
    //TODO go to dashboard page from admin page (pass the card id parameter
    const [selectedCard, setSelectedCard] = useState();
    const [cardsList, setCardsList] = useState([]);
    let { userId } = useParams();
    const listcards = cardsList.map((option, index) => (
        <option key={option.code} value={option.code}>
            {option.title}
        </option>
    ));
    const currUserId=getMe().id;

    useEffect(() => {
        getAllCards()
    }, []);

    function getAllCards() {
        var objlist =[]
        axios({
            method: 'get',
            url: `${hostName}/user/${currUserId}/cards`
        }).then((response) => {
            console.log(response.data.data);
            // setCardsList([response.data.data]);
            for (var obj in response.data.data) {
                let cardObj= {};
                console.log(response.data.data[obj].code);
                console.log(response.data.data[obj].title);
                console.log(response.data.data[obj].owner.last_name + " " + response.data.data[obj].owner.name);
                cardObj['title']=response.data.data[obj].title;
                cardObj['code']=response.data.data[obj].code;
                objlist.push(cardObj);
            }
            setCardsList(objlist);

        }).catch((err) => {
            console.log(err.response);
        }).finally(() => {

        })
    }

    // Chakra Color Mode
    const paleGray = useColorModeValue("secondaryGray.400", "whiteAlpha.100");
    return (

        <Flex
            direction={{base: "column", xl: "row"}}
            pt={{base: "130px", md: "80px", xl: "80px"}}>


            <Flex direction='column' width='stretch'>
                <Flex>
                    <text>Select card to preview Statistics</text>
                <Select  width="20%" onChange={(e) => {
                                setSelectedCard({
                                    name: cardsList[e.target.value].name,
                                    uuid: cardsList[e.target.value].uuid
                                })
                            }}
                                    id='company'
                            >
                                <option value='None'> None</option>
                                {listcards}
                            </Select></Flex>
                <Grid
                    mb='20px'
                    gridTemplateColumns={{base: "repeat(2, 1fr)", "2xl": "720fr 350fr"}}
                    gap='20px'
                    display={{base: "block", lg: "grid"}}>
                    <Flex gridArea={{base: "1 / 1 / 2 / 3", "2xl": "1 / 1 / 2 / 2"}}>
                        <OverallRevenue/>
                    </Flex>
                    <Flex gridArea={{base: "2 / 1 / 3 / 3", "2xl": "1 / 2 / 2 / 3"}}>
                        <DailyTraffic/>
                    </Flex>
                </Grid>
                <Grid
                    gap='20px'
                    gridTemplateColumns={{
                        md: "repeat(2, 1fr)",
                        "2xl": "repeat(3, 1fr)",
                    }}
                    gridTemplateRows={{
                        md: "repeat(2, 1fr)",
                        "2xl": "1fr",
                    }}
                    mb='20px'>
                    <Flex gridArea={{md: "1 / 1 / 2 / 2", "2xl": "1 / 1 / 2 / 2"}}>
                        <YourTransfers/>
                    </Flex>
                    <Flex gridArea={{md: "1 / 2 / 2 / 3", "2xl": "1 / 2 / 2 / 3"}}>
                        <Doughnut data={data}/>
                    </Flex>
                    <Flex gridArea={{md: " 2 / 1 / 3 / 3", "2xl": "1 / 3 / 2 / 4"}}>

                    </Flex>
                </Grid>
                <Grid
                    templateColumns={{base: "repeat(2, 1fr)", "2xl": "350fr 720fr"}}
                    gap='20px'
                    display={{base: "block", lg: "grid"}}>
                    <Flex gridArea={{base: "1 / 1 / 2 / 3", "2xl": "1 / 1 / 2 / 2"}}>
                        {/*<Map/>*/}

                    </Flex>
                    <Flex gridArea={{base: "2 / 1 / 3 / 3", "2xl": "1 / 2 / 2 / 3"}}>

                    </Flex>
                </Grid>
            </Flex>
            <VSeparator
                mx='20px'
                bg={paleGray}
                display={{base: "none", xl: "flex"}}
            />
        </Flex>
    );
}
