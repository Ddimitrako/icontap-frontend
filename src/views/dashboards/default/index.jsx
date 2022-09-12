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
import { Flex, Grid, useColorModeValue } from "@chakra-ui/react";
// Custom components
import Balance from "views/dashboards/default/components/Balance";
import DailyTraffic from "views/dashboards/default/components/DailyTraffic";
import MostVisitedTable from "views/dashboards/default/components/MostVisitedTable";
import { VSeparator } from "components/separator/Separator";
import OverallRevenue from "views/dashboards/default/components/OverallRevenue";
import ProfitEstimation from "views/dashboards/default/components/ProfitEstimation";
import ProjectStatus from "views/dashboards/default/components/ProjectStatus";
import YourCard from "views/dashboards/default/components/YourCard";
import YourTransfers from "views/dashboards/default/components/YourTransfers";
import { tableColumnsMostVisited } from "views/dashboards/default/variables/tableColumnsMostVisited";
import tableDataMostVisited from "views/dashboards/default/variables/tableDataMostVisited.json";
import Banner from "../../main/profile/overview/components/Banner";
import banner from "assets/img/auth/banner.png";
import avatar from "assets/img/avatars/avatar4.png";
import { getAuth } from "Helpers/Auth";
export default function Default() {
  // Chakra Color Mode
  const paleGray = useColorModeValue("secondaryGray.400", "whiteAlpha.100");
  return (
    <Flex
      direction={{ base: "column", xl: "row" }}
      pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <Flex direction='column' width='stretch'>
        <Grid
          mb='20px'
          gridTemplateColumns={{ base: "repeat(2, 1fr)", "2xl": "720fr 350fr" }}
          gap='20px'
          display={{ base: "block", lg: "grid" }}>
          <Flex gridArea={{ base: "1 / 1 / 2 / 3", "2xl": "1 / 1 / 2 / 2" }}>
            <OverallRevenue />
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
          <Flex gridArea={{ md: "1 / 1 / 2 / 3", "2xl": "1 / 1 / 2 / 2" }}>
             <MostVisitedTable
              tableData={tableDataMostVisited}
              columnsData={tableColumnsMostVisited}
            />
          </Flex>
        </Grid>
        <Grid
          templateColumns={{ base: "repeat(2, 1fr)", "2xl": "350fr 720fr" }}
          gap='20px'
          display={{ base: "block", lg: "grid" }}>
        </Grid>
      </Flex>
      <VSeparator
        mx='20px'
        bg={paleGray}
        display={{ base: "none", xl: "flex" }}
      />

      <Banner
          gridArea='1 / 1 / 2 / 2'
          banner={banner}
          avatar={avatar}
          name='John Kehas'
          job='Product Designer'
          posts='17'
          followers='9.7k'
          following='274'
        />
        <YourCard
        maxW={{ base: "100%", xl: "400px" }}
        maxH={{ base: "100%", xl: "1100px", "2xl": "100%" }}
      />
    </Flex>





  );
}
