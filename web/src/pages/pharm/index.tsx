import {
  Box,
  Spinner,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  useDisclosure,
} from "@chakra-ui/react";
import Cookies from "js-cookie";
import moment from "moment";
import React from "react";
import { ApproveReservation } from "../../components/employee/ApproveReservation";
import { Consultations } from "../../components/employee/Consultations";
import { MyCalendar } from "../../components/employee/MyCalendar";
import { RequestHoliday } from "../../components/employee/RequestHoliday";
import { Loading } from "../../components/Loading";
import { useAppointmentsQuery } from "../../generated/graphql";

const TabMenu = () => (
  <TabList>
    <Tab>Reservations</Tab>
    <Tab>Consultations</Tab>
    <Tab>Calendars</Tab>
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
  if (fetching) body = <Loading />;
  else if (!data) body = <Loading />;
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
                  <ApproveReservation />
                </TabPanel>
                <TabPanel>
                  <Consultations />
                </TabPanel>
                <TabPanel>
                  <RequestHoliday />
                  <MyCalendar events={events} />
                </TabPanel>
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
