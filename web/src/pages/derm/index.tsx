import {
  Box,
  Button,
  HStack,
  Input,
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
import { Formik, Form, Field } from "formik";
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
  usePatientsQuery,
  useScheduleAppointmentEmployeeMutation,
} from "../../generated/graphql";
import { MyDateInput, MyTimeInput } from "../../utils/utils";
import { DatePickerField } from "../shop";

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
  const token = Cookies.get('token')
  const [pharmacyId, setPharmacyId] = useState("19");
  const [{ fetching, data }] = useFreeAppointmentsQuery({
    variables: {
      pharmacyId: pharmacyId,
      token:token,
      kind:'derm'
    }
  });
  let selectedModal = useDisclosure()

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

  useEffect(() => {console.log(pharmacyId)}, [pharmacyId]);

  let body = null;
  if (fetching) body = <div>Loading</div>;
  else if (!data) body = <div>Loading</div>;
  else {
    if (!data.freeAppointments) {
      body = <div>No Free Appointments</div>;
    } else {
      body = <DataTable data={data.freeAppointments} columns={columns} />;
    }
  }
  return (
    <>
      <Button onClick={() => {selectedModal.onOpen() }}>Schedule New Appointment</Button>
      <select onChange={(e) => setPharmacyId(e.target.value)}>
        {pharmacyIds.map((item) => (
          <option>{item}</option>
        ))}
      </select>
      {body}
      <ScheduleExam
      pharmacyId={pharmacyId}
      isOpen={selectedModal.isOpen}
      onClose={selectedModal.onClose}
      />
    </>
  );
};

const arrayHours = [
  0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
  22, 23,
];
const ScheduleExam = ({ pharmacyId, isOpen, onClose }) => {
  const [time, setTime] = useState({});
  const [selectedPharmacy, setSelectedPharmacy] = useState();
  const stageTwoModal = useDisclosure();

  useEffect(() => {}, [selectedPharmacy]);

   return (
     <>
   <Modal  isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader></ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Formik
            initialValues={{
              date: "",
              hours: "",
              minutes: "00",
            }}
            onSubmit={(data, { setSubmitting }) => {
              setTime(data);
              stageTwoModal.onOpen()
              onClose()
            }}
          >
            {({ values, errors, isSubmitting }) => (
              <Form>
                <ModalHeader>Choose Time</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  Date
                  <DatePickerField name="date" value={values.date} />
                  <div>
                    Time
                    <Field component="select" id="hours" name="hours">
                      {arrayHours.map((item) => (
                        <option value={item}> {item} </option>
                      ))}
                    </Field>
                    <Field component="select" id="minutes" name="minutes" >
                      <option value={"00"}>00</option>
                      <option value={"15"}>15</option>
                      <option value={"30"}>30</option>
                      <option value={"45"}>45</option>
                    </Field>
                  </div>
                </ModalBody>
                <ModalFooter>
                  <Button type="submit" >
                    Next
                  </Button>
                </ModalFooter>
              </Form>
            )}
          </Formik>
 
        </ModalBody>
        <ModalFooter >
        </ModalFooter>
      </ModalContent>
    </Modal>
      <PatientList
        time={time}
        pharmacyId={pharmacyId}
        isOpen={stageTwoModal.isOpen}
        onClose={stageTwoModal.onClose}
      />
      </>
    )
};
const PatientList = ({ pharmacyId, isOpen, time, onClose }) => {
  const token = Cookies.get('token')
  const [employees,setEmployees] = useState([])
  const [{ fetching, data }] = usePatientsQuery();
  const [, scheduleApp ] = useScheduleAppointmentEmployeeMutation();

  const handler = (row) => {
		let date = new Date(time.date)
		date.setTime(date.getTime() + (2*60*60*1000))
		if(time.hours)
			date.setTime(date.getTime() + (parseInt(time.hours)*60*60*1000))
		if(time.minutes)
			date.setTime(date.getTime() + (parseInt(time.minutes)*60*1000))
    let variables = {
      inputs: {
        kind: 'derm',
        pharmacy: {
          id: parseInt(pharmacyId)
        },
        patient: {
          email: row.email
        },
        begin: date
      },
      token: token
    }
    scheduleApp(variables).then(
      res => console.log(res)
    )
    onClose()
  }


  let body = null
  if(fetching) body = <div>Loading</div>
  else if(!data) body = <div>Loading</div>
  else {
    // @ts-ignore

    let temp = []

    const columns = [
      { name: "Name", selector: "firstName", sortable: true },
      { name: "Last Name", selector: "lastName", sortable: true },
      { name: "Email", selector: "email", sortable: true },
      {
        name: "",
        button: true,
        cell: (row: any) => (
          <Button size="sm" onClick={() => handler(row)}>
            Schedule
          </Button>
        ),
      }
    ];

    body = (
      <>
      <DataTable
        data={data.patients}
        columns={columns}
      />
      </>
    )

  }

  return (
    <>
    <Modal isOpen={isOpen} onClose={onClose} size="2xl">
      <ModalOverlay />
      <ModalContent maxW="56rem" maxH="106rem">
        <ModalHeader>Choose Pharmacy</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {body}
        </ModalBody>
        <ModalFooter>
          <Button>Next</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
    </>
  );
};

