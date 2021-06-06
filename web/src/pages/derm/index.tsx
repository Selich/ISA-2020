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
import DataTable from "react-data-table-component";
import { Examinations } from "../../components/employee/Examinations";
import { MyCalendar } from "../../components/employee/MyCalendar";
import { PatientSearch } from "../../components/employee/PatientSearch";
import { RequestHoliday } from "../../components/employee/RequestHoliday";
import { Loading } from "../../components/Loading";
import {
  useAppointmentsQuery, useHolidayQuery
} from "../../generated/graphql";

const TabMenu = () => (
  <TabList>
    <Tab>Examinations</Tab>
    <Tab>Calendars</Tab>
    <Tab>Patients</Tab>
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
                  <Examinations />
                </TabPanel>
                <TabPanel>
                  <RequestHoliday/>
                  <MyCalendar events={events} />
                </TabPanel>
                <TabPanel>
                  <PatientSearch/>
                </TabPanel>
                <TabPanel>
                  <Holidays />
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

const Holidays = () => {
  

  const token = Cookies.get('token')
  const [{ fetching, data }] = useHolidayQuery({ variables: { token: token } });

	const columns = [
		{ name: "From", selector: "from", sortable: true },
		{ name: "Until", selector: "until", sortable: true },
		{ name: "Holiday Approved", id:'isApproved', accessor: item => item.isApproved.toString(), sortable: true
  },

	];
  
  let body = null;
  if (fetching) body = <Loading/>;
  else if (!data) body = <Loading/>;
  else {
  body = (
    <DataTable
    data={data.holiday}
    columns={columns}
    />
  )
  }

  return body


}