import {
  Box, Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs
} from "@chakra-ui/react";
import Cookies from "js-cookie";
import moment from "moment";
import React, { useState } from "react";
import MyCalendar from "../../components/sections/Calendar";
import {
  useAppointmentsQuery
} from "../../generated/graphql";

const TabMenu = () => (
  <TabList>
    <Tab>Patients</Tab>
    <Tab>Examinations</Tab>
    <Tab>Calendars</Tab>
    <Tab>Holidays</Tab>
    <Tab>Profile</Tab>
  </TabList>
);


const calculateEnd = (temp) => {
    let events = [];

    // @ts-ignore
    temp.forEach((item) => {
    // @ts-ignore
      item.begin = new Date(item.begin);
    // @ts-ignore
			item['end'] = moment(item.begin).add(item.length,'m').toDate()
      events.push(item);
    });

    return events


}

export default function Index() {
  let token = Cookies.get("token");
  const [{ fetching, data }] = useAppointmentsQuery({
    variables: {
      token: token,
      inputs: {
        employee: null,
      },
    },
  });

  let body = null;
  if (fetching) body = <div>test</div>;
  else if (!data) body = <div>test</div>;
  else {
    let events = calculateEnd(data.appointments)

    // @ts-ignore
    body = (
      <>
        <Box m="4" p="8" fontSize="2rem">
          <Box>
            <Tabs isFitted colorScheme="green">
              <TabMenu />
              <TabPanels>
                <TabPanel>
                  {/* <Patients events={data.appointments}/> */}
                </TabPanel>
                <TabPanel>
                  {/* <DermExaminations events={data.appointments}/> */}
                </TabPanel>
                <TabPanel>
                  {/* <MyCalendar events={events} /> */}
                </TabPanel>
                <TabPanel>
                  {/* <DermHolidays /> */}
                </TabPanel>
                {/* <TabPanel><Profile/></TabPanel> */}
              </TabPanels>
            </Tabs>
          </Box>
        </Box>
      </>
    );
  }
  return body;
}
