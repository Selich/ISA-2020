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
import { usePatientQuery } from "../../generated/graphql";
import { PatientDetails } from "../../components/layouts/patient/PatientDetails";
import { PatientProfile } from "../../components/layouts/patient/PatientProfile";
import { getUserDetails } from "../../utils/getUserDetails";
import { HistoryTableDerm } from "../../components/tables/HistoryTableDerm";
import { HistoryTablePharm } from "../../components/tables/HistoryTablePharm";
import { EPrescriptionsTable } from "../../components/tables/EPrescriptionsTable";
import { EmployeeTable } from "../../components/tables/EmployeeTable";
import { PharmaciesTable } from "../../components/tables/PharmaciesTable";
import { ReservationsTable } from "../../components/tables/ReservationsTable";
import { SubscriptionTable } from "../../components/tables/SubscriptionTable";
import { MyTimeInput, MyDateInput } from '../../utils/utils'


const ScheduleConsultations = ({user}) => {
	const [selectedDate, setSelectedDate] = useState({day: '', month: '' , year: ''})

	return (
		<>
			<SimpleGrid columns={2} spacing={2}>
				<Box>
						Date:
						<MyDateInput setter={setSelectedDate}/>
						Time:
						<MyTimeInput setter={setSelectedDate}/>
				</Box>
				<Box>
					
				</Box>
			</SimpleGrid>
			</>
	)

}

const Consultations = ({ user }) => {
  return (
    <>
      <Tabs colorScheme="green">
        <TabList>
          <Tab>Currently Scheduled</Tab>
          <Tab>History</Tab>
          <Tab>Schedule Consultation</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <HistoryTablePharm kind={"current"} />
          </TabPanel>
          <TabPanel>
            <HistoryTablePharm kind={"history"} />
          </TabPanel>
          <TabPanel>
						<ScheduleConsultations user={user}/>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
};

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
);

const View = ({ data }) => (
  <>
    <Box m="4" p="8" fontSize="2rem">
      <Box>
        <PatientDetails data={data} />
        <hr />
        <Tabs isFitted colorScheme="green">
          <TabMenu />
          <TabPanels>
            <TabPanel>
              <Tabs colorScheme="green">
                <TabList>
                  <Tab>Currently Scheduled</Tab>
                  <Tab>History</Tab>
                </TabList>
                <TabPanels>
                  <TabPanel>
                    <HistoryTableDerm kind={"current"} />
                  </TabPanel>
                  <TabPanel>
                    <HistoryTableDerm kind={"history"} />
                  </TabPanel>
                </TabPanels>
              </Tabs>
            </TabPanel>
            <TabPanel>
              <Consultations user={data} />
            </TabPanel>
            <TabPanel>
              <PharmaciesTable user={data} />
            </TabPanel>
            <TabPanel>
              <EPrescriptionsTable />
            </TabPanel>
            <TabPanel>
              <ReservationsTable />
            </TabPanel>
            <TabPanel>
              <SubscriptionTable data={data} />
            </TabPanel>
            <TabPanel></TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Box>
  </>
);
// TODO: FIX PATIENT PROFILE

export default function Index() {
  return getUserDetails(<View data />, usePatientQuery);
}
