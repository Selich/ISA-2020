import { Tabs, TabList, Tab, TabPanels, TabPanel } from "@chakra-ui/react";
import React from "react";
import { HistoryTablePharm } from "../tables/HistoryTablePharm";

export const Consultations = () => {
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
						{/* <ScheduleConsultations/> */}
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
};
