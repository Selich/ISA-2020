import React, { useState, useEffect } from "react";
import {
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Box,
  Button,
  SimpleGrid,
  Text,
  HStack,
} from "@chakra-ui/react";
import { useEmployeeQuery } from "../../generated/graphql";
import { PatientDetails } from "../../components/layouts/patient/PatientDetails";
import { PatientProfile } from "../../components/layouts/patient/PatientProfile";
import { getUserDetails } from "../../utils/getUserDetails";
import { PharmaciesTable } from  '../../components/tables/PharmaciesTable'
import { HistoryTableDerm } from  '../../components/tables/HistoryTableDerm'
import { HistoryTablePharm } from  '../../components/tables/HistoryTablePharm'
import { EPrescriptionsTable } from  '../../components/tables/EPrescriptionsTable'
import { ReservationsTable } from "../../components/tables/ReservationsTable";
import { SubscriptionTable } from "../../components/tables/SubscriptionTable";

const TabMenu = () => (
            <TabList>
              <Tab>Examinations</Tab>
              <Tab>Consultation</Tab>
              <Tab>Pharmacies</Tab>
              <Tab>E-Prescriptions</Tab>
              <Tab>Reservations</Tab>
              <Tab>Subscriptions</Tab>
              <Tab>Profile</Tab>
            </TabList>
)

const View = ({ data }) => (
  <>
    <Box m="4" p="8" fontSize="2rem">
        <Box align="center">
          <PatientDetails data={data} />
					<hr/>
          <Tabs isFitted variant="soft-rounded" colorScheme="green">
						<TabMenu/>
            <TabPanels>
              <TabPanel>
								<Button>
									Schedule New Examination +
								</Button>
								<HistoryTableDerm/>
              </TabPanel>
              <TabPanel>
								<HistoryTablePharm/>
              </TabPanel>
              <TabPanel>
								<PharmaciesTable user={data}/>
              </TabPanel>
              <TabPanel>
								<EPrescriptionsTable/>
              </TabPanel>
              <TabPanel>
								<ReservationsTable/>
              </TabPanel>
              <TabPanel>
								<SubscriptionTable data={data}/>
              </TabPanel>
              <TabPanel>
								<PatientProfile/>
              </TabPanel>
            </TabPanels>
          </Tabs>
				</Box>
    </Box>
  </>
);

export default function Index() {
  return getUserDetails(<View data />, useEmployeeQuery);
}
