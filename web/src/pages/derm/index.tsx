import {
  Box,
  Button,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  SimpleGrid,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  useDisclosure,
} from "@chakra-ui/react";
import Cookies from "js-cookie";
import moment from "moment";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { FaFacebook } from "react-icons/fa";
import { MyCalendar } from "../../components/employee/MyCalendar";
import CreateAdminForm from "../../components/sections/forms/CreateAdminForm";
import {
  useAppointmentsQuery,
  useFreeAppointmentsQuery,
} from "../../generated/graphql";
import { MyDateInput, MyTimeInput } from "../../utils/utils";

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
                  {/* <Patients events={data.appointments}/> */}
                </TabPanel>
                <TabPanel>
                  <Examinations />
                  {/* <DermExaminations events={data.appointments}/> */}
                </TabPanel>
                <TabPanel>
                  <MyCalendar events={events} />
                </TabPanel>
                <TabPanel>{/* <DermHolidays /> */}</TabPanel>
                <TabPanel>{/* <Profile/> */}</TabPanel>
              </TabPanels>
            </Tabs>
          </Box>
        </Box>
        <ScheduleExam isOpen={examModal.isOpen} onClose={examModal.onClose} />
      </>
    );
  }
  return body;
}
const pharmacyIds = ["19", "20", "21"];
const Examinations = () => {
  const [pharmacyId, setPharmacyId] = useState("19");
  const [{ fetching, data }] = useFreeAppointmentsQuery({
    variables: { pharmacyId },
  });
  const handler = (row) => {
    alert(row)

  }
  const columns = [
    { name: "Begin", selector: "begin", sortable: true },
    {
        name: "",
        button: true,
        cell: (row: any) => (
          <Button size="sm" onClick={() => handler(row)}>
            Select
          </Button>
        ),
   }

  ];

  useEffect(() => {}, [pharmacyId]);
  let body = null;
  if (fetching) body = <div>Loading</div>;
  else if (!data) body = <div>Loading</div>;
  else {
    console.log(data.freeAppointments)
    if (!data.freeAppointments) {
      body = <div>No Free Appointments</div>;
    } else {
      body = <DataTable data={data.freeAppointments} columns={columns} />;
    }
  }
  return (
    <>
      <Button>Schedule New Appointment</Button>
      <select onChange={(e) => setPharmacyId(e.target.value)}>
        {pharmacyIds.map((item) => (
          <option>{item}</option>
        ))}
      </select>
      {body}
    </>
  );
};
const ScheduleExam = ({ isOpen, onClose }) => {
  const [selectedDate, setSelectedDate] = useState({
    day: "",
    month: "",
    year: "",
  });
  const [selectedPharmacy, setSelectedPharmacy] = useState();
  const pharmModal = useDisclosure();

  useEffect(() => {}, [selectedPharmacy]);

   return (<Modal  isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader></ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <div>test</div>
        </ModalBody>
        <ModalFooter >
        </ModalFooter>
      </ModalContent>
    </Modal>
    )
};
