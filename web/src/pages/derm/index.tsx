import {
  Box, Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  useDisclosure
} from "@chakra-ui/react";
import Cookies from "js-cookie";
import moment from "moment";
import React from "react";
import { Examinations } from "../../components/employee/Examinations";
import { MyCalendar } from "../../components/employee/MyCalendar";
import { RequestHoliday } from "../../components/employee/RequestHoliday";
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

export default function Index() {
  let token = Cookies.get("token");
  let examModal = useDisclosure();
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
    // @ts-ignore
    let events = [];
    let temp = data.appointments;

    if (temp) {
      // @ts-ignore
      temp.forEach((item) => {
        // @ts-ignore
        item.begin = new Date(item.begin);
        // @ts-ignore
        item["end"] = moment(item.begin).add(item.length, "m").toDate();
        events.push(item);
      });
    }

    // @ts-ignore
    body = (
      <>
        <Box m="4" p="8" fontSize="2rem">
          <Box>
            <Tabs isFitted colorScheme="green">
              <TabMenu />
              <TabPanels>
                <TabPanel>
                  <div>Patients</div>
                </TabPanel>
                <TabPanel>
                  <Examinations />
                </TabPanel>
                <TabPanel>
                  <RequestHoliday/>
                  <MyCalendar events={events} />
                </TabPanel>
                <TabPanel>{/* <DermHolidays /> */}</TabPanel>
                <TabPanel>{/* <Profile/> */}</TabPanel>
              </TabPanels>
            </Tabs>
          </Box>
        </Box>
      </>
    );
  }
  return body;
}
