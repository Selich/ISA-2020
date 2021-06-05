import {
  Box,
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  SimpleGrid,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { PatientDetails } from "../../components/layouts/patient/PatientDetails";
import DataTable from "react-data-table-component";
import { Consultations } from "../../components/patient/Consultations";
import { EPrescriptions } from "../../components/patient/EPrescriptions";
import { Examinations } from "../../components/patient/Examinations";
import { AppointmentsTable } from "../../components/tables/AppointmentsTable";
import { EmployeeTable } from "../../components/tables/EmployeeTable";
import { EPrescriptionsTable } from "../../components/tables/EPrescriptionsTable";
import { ReservationsTable } from "../../components/tables/ReservationsTable";
import { SubscriptionTable } from "../../components/tables/SubscriptionTable";
import { TableComponent } from "../../components/tables/TableComponent";
import {
  useAppointmentsQuery,
  useHolidayQuery,
  usePatientsByDoctorQuery,
	useRequestHolidayMutation,
} from "../../generated/graphql";
import { getUserDetails } from "../../utils/getUserDetails";
import { MyDateInput, MyTimeInput } from "../../utils/utils";

const SelectedPharmModal: any = ({
  isOpen,
  onClose,
  onOpen,
  selectedPharmacy,
}) => {
  const [selectedEmployee, setSelectedEmployee] = useState();

  if (!selectedPharmacy) return <div></div>;

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="">
      <ModalOverlay />
      <ModalContent maxW="56rem" maxH="106rem">
        <ModalHeader>
          <Text fontSize="xl">{selectedPharmacy.name}</Text>
          <Text fontSize="xl">Select Pharmacist: </Text>
        </ModalHeader>
        <ModalBody>
          <EmployeeTable
            handler={setSelectedEmployee}
            action="select"
            kind={"derm"}
            pharmacy={selectedPharmacy}
          />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

const ScheduleConsultations = () => {
  const [selectedDate, setSelectedDate] = useState({
    day: "",
    month: "",
    year: "",
  });
  const [selectedPharmacy, setSelectedPharmacy] = useState();
  const pharmModal = useDisclosure();

  useEffect(() => {}, [selectedPharmacy]);

  return (
    <>
      <SimpleGrid columns={2} spacing={2}>
        <Box>
          Date:
          <MyDateInput setter={setSelectedDate} />
          Time:
          <MyTimeInput setter={setSelectedDate} />
        </Box>
        <Box>
          {/** @ts_ignore **/}
          {/* <PharmaciesTable onOpen={pharmModal.onOpen} kind={'schedule'}  setSelectedPharmacy={setSelectedPharmacy}/> */}
        </Box>
      </SimpleGrid>
      <SelectedPharmModal
        selectedPharmacy={selectedPharmacy}
        onOpen={pharmModal.onOpen}
        isOpen={pharmModal.isOpen}
        onClose={pharmModal.onClose}
      />
    </>
  );
};

const TabMenu = () => (
  <TabList>
    <Tab>Holidays</Tab>
    <Tab>System Admins</Tab>
    <Tab>Employees</Tab>
    <Tab>Pharmacies</Tab>
    <Tab>Medicines</Tab>
    <Tab>Pharm Admin</Tab>
    <Tab>Complaints</Tab>
    <Tab>Loyalty Program</Tab>
  </TabList>
);

export const Patients = ({events}) => {

	// TODO
	console.log(events)
let patients = events.map(item => item.patient)
let ids = patients.map(item => item.id)
ids = new Set(ids)
patients.filter(item => item.id )

const columns = [
    { name: "Id", selector: "id", sortable: true },
    { name: "Patient Name", selector: "firstName", sortable: true },
    { name: "Patient Surname", selector: "lastName", sortable: true },
  ];

  return <DataTable
					columns={columns}
					data={patients}


	
	/>;
	
};

export const DermExaminations = ({events}) => {


	console.log(events)
  const columns = [
    { name: "Patient Name", selector: "patient.firstName", sortable: true },
    { name: "Patient Surname", selector: "patient.lastName", sortable: true },
  ];

  return <DataTable
					columns={columns}
					data={events}

	
	/>;
	


};
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import Cookies from "js-cookie";
import { DatePickerField } from "../shop";
import { Formik, Form } from "formik";

const localizer = momentLocalizer(moment);

const MyCalendar = (props) => (
	// add events
  <div>
    <Calendar
      step={60}
      style={{ height: 500, width: "95%" }}
      localizer={localizer}
      events={props.events}
      startAccessor="begin"
      endAccessor="end"
    />
  </div>
);

const Holidays = () => {
  let token = Cookies.get("token");
  const [{ fetching, data }] = useHolidayQuery({variables: {token}});

  const columns = [
    { name: "From", selector: "from", sortable: true },
    { name: "Until", selector: "until", sortable: true },
    { name: "Employee", selector: "employee.firstName", sortable: true },
    { name: "Employee", selector: "employee.lastName", sortable: true },
    {
        name: "",
        button: true,
        cell: (row: any) => (
          <Button size="sm" onClick={() => alert(row)}>
            Approve
          </Button>
        ),
    },
    {
        name: "",
        button: true,
        cell: (row: any) => (
          <Button size="sm" onClick={() => alert(row)}>
            Deny
          </Button>
        ),
    }
  ];

  let body = null;
  if (fetching) body = <p>loading...</p>;
  else if (!data) body = <p>Null data...</p>;
  else {
  body = (
		<>
        <DataTable
          //@ts-ignore
          data={data.holiday}
          columns={columns}
        />
    </>
	)
  }
  return body

};

export default function Index() {
    // @ts-ignore
    return(

      <>
        <Box m="4" p="8" fontSize="2rem">
          <Box>
            <Tabs isFitted colorScheme="green">
              <TabMenu />
              <TabPanels>
                <TabPanel>
                  <Holidays/>
                </TabPanel>
                <TabPanel>
                  {/* <DermExaminations events={data.appointments}/> */}
                </TabPanel>
                <TabPanel>
                  {/* <MyCalendar events={events} /> */}
                </TabPanel>
                <TabPanel>
                </TabPanel>
                <TabPanel>{/* <Profile/> */}</TabPanel>
              </TabPanels>
            </Tabs>
          </Box>
        </Box>
      </>
    )
}
