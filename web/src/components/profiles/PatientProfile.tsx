import { TabList, Tab, Box, Tabs, TabPanels, TabPanel } from "@chakra-ui/react";
import React from "react";
import { usePatientQuery } from "../../generated/graphql";
import { getUserDetails } from "../../utils/getUserDetails";
import { PatientDetails } from "../layouts/patient/PatientDetails";
import { Consultations } from "../patient/Consultations";
import { Examinations } from "../patient/Examinations";
import { EPrescriptionsTable } from "../tables/EPrescriptionsTable";
import { ReservationsTable } from "../tables/ReservationsTable";
import { SubscriptionTable } from "../tables/SubscriptionTable";

const TabMenu = () => (
  <TabList>
    <Tab>Examinations</Tab>
    <Tab>Consultation</Tab>
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
        <PatientDetails/>
        <hr />
        <Tabs isFitted colorScheme="green">
          <TabMenu />
          <TabPanels>
            <TabPanel>
              <Examinations/>
            </TabPanel>
            <TabPanel>
              <Consultations/>
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

export default function PatientProfile() {
  return getUserDetails(<View data />, usePatientQuery);
}
