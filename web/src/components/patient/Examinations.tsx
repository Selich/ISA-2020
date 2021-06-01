import { Tabs, TabList, Tab, TabPanels, TabPanel } from "@chakra-ui/react";
import React from "react";
import { CurrentlyScheduled } from "./CurrentlyScheduled";

export const Examinations = () => {
  return (
    <Tabs colorScheme="green">
      <TabList>
        <Tab>Currently Scheduled</Tab>
        <Tab>History</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <CurrentlyScheduled />
        </TabPanel>
        <TabPanel></TabPanel>
      </TabPanels>
    </Tabs>
  );
};
