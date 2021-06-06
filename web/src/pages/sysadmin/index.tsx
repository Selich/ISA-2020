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
  useDisclosure
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import Cookies from "js-cookie";
import moment from "moment";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import DataTable from "react-data-table-component";
import { AppointmentDefinition } from "../../components/admin/AppointmentDefinition";
import { LoyaltyProgram } from "../../components/admin/LoyaltyProgram";
import { Pharmacies } from "../../components/admin/Pharmacies";
import { SysAdminComplaints } from "../../components/admin/SysAdminComplaints";
import { SysAdminMedicine } from "../../components/admin/SysAdminMedicine";
import { AdminHolidays } from "../../components/AdminHoliday";
import { EmployeeTable } from "../../components/tables/EmployeeTable";
import {
  useAddEmployeeMutation, useEmployeesQuery,
  useHolidayQuery
} from "../../generated/graphql";
import { MyDateInput, MyTimeInput } from "../../utils/utils";

const TabMenu = () => (
  <TabList>
    <Tab>Employees</Tab>
    <Tab>Pharmacies</Tab>
    <Tab>Medicines</Tab>
    <Tab>Complaints</Tab>
    <Tab>Loyalty Program</Tab>
    <Tab>Appointment Definition</Tab>
    <Tab>Holidays</Tab>
  </TabList>
);
export default function Index() {
  // @ts-ignore
  return (
    <>
      <Box m="4" p="8" fontSize="2rem">
        <Box>
          <Tabs isFitted colorScheme="green">
            <TabMenu />
            <TabPanels>
              <TabPanel>
                <Employees />
              </TabPanel>
              <TabPanel>
                <Pharmacies />
              </TabPanel>
              <TabPanel>
                {/* <SysAdminMedicine /> */}
              </TabPanel>
              <TabPanel>
                <SysAdminComplaints/>
              </TabPanel>
              <TabPanel>
                <LoyaltyProgram/>
              </TabPanel>
              <TabPanel>
                <AppointmentDefinition/>
              </TabPanel>
              <TabPanel>
                <AdminHolidays />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </Box>
    </>
  );
}

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
          {/* <Text fontSize="xl">{selectedPharmacy.name}</Text> */}
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

export const Patients = ({ events }) => {
  // TODO
  console.log(events);
  let patients = events.map((item) => item.patient);
  let ids = patients.map((item) => item.id);
  ids = new Set(ids);
  patients.filter((item) => item.id);

  const columns = [
    { name: "Id", selector: "id", sortable: true },
    { name: "Patient Name", selector: "firstName", sortable: true },
    { name: "Patient Surname", selector: "lastName", sortable: true },
  ];

  return <DataTable columns={columns} data={[]} />;
};

export const DermExaminations = ({ events }) => {
  console.log(events);
  const columns = [
    { name: "Patient Name", selector: "patient.firstName", sortable: true },
    { name: "Patient Surname", selector: "patient.lastName", sortable: true },
  ];

  return <DataTable columns={columns} data={[]} />;
};

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
  const [{ fetching, data }] = useHolidayQuery({ variables: { token } });

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
    },
  ];

  let body = null;
  if (fetching) body = <p>loading...</p>;
  else if (!data) body = <p>Null data...</p>;
  else {
    body = (
      <>
        <DataTable
          //@ts-ignore
          data={[]}
          columns={columns}
        />
      </>
    );
  }
  return body;
};


const Employees = () => {
  const createModal = useDisclosure();
  const token = Cookies.get("token");
  let variables = {
    inputs: {
      role: "any",
    },
    token: token,
  };
  const handler = (row) => {};
  const [{ fetching, data }] = useEmployeesQuery({ variables });
  let body = null;
  if (fetching) body = <div>Loading</div>;
  else if (!data) body = <div>Loading</div>;
  else {
    const columns = [
      { name: "FirstName", selector: "firstName", sortable: true },
      { name: "Role", selector: "role", sortable: true },
      { name: "Email", selector: "email", sortable: true },
      {
        name: "",
        button: true,
        cell: (row: any) => (
          <Button size="sm" onClick={() => handler(row)}>
            Report
          </Button>
        ),
      },
    ];
    if (data.employees) {
      console.log(data.employees)
      body = <DataTable data={data.employees} columns={columns} />;
    } else {
      console.log('Employees')
      console.log(data.employees)
      body = <DataTable data={[]} columns={columns} />;
    }
  }
  return (
    <>
      <Button onClick={() => createModal.onOpen()}>Create Employee</Button>
      {body}
      <CreateModal
        onOpen={createModal.onOpen}
        isOpen={createModal.isOpen}
        onClose={createModal.onClose}
      />
    </>
  );
};

const CreateModal = ({ onOpen, isOpen, onClose }) => {
  const [, addEmployee] = useAddEmployeeMutation();
  const router = useRouter()

  const token = Cookies.get("token");

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="">
      <ModalOverlay />
      <ModalContent maxW="56rem" maxH="106rem">
        <ModalHeader>
          <Text fontSize="xl">Create Employee:</Text>
        </ModalHeader>
        <ModalBody>
          <Formik
            initialValues={{
              email: "",
              firstName: "",
              lastName: "",
              address: {
                street: "",
                city: "",
                country: "",
              },
              telephone: "",
              role: "",
            }}
            onSubmit={async (values, { setErrors }) => {
              let variables = {
                inputs: {
                  email: values.email,
                  firstName: values.firstName,
                  lastName: values.lastName,
                  telephone: values.telephone,
                  role: values.role,
                },
                token: token,
              };
              console.log(variables);

              addEmployee(variables).then((res) => {
                alert("Employee Created.");
                onClose();
                router.reload()
              });
            }}
          >
            {({ isSubmitting }) => (
              <Form>
                <div>
                  Email:
                  <Field type="email" name="email" />
                </div>
                <div>
                  First Name:
                  <Field type="text" name="firstName" />
                </div>
                <div>
                  Last Name:
                  <Field type="text" name="lastName" />
                </div>
                <div>
                  Role:
                  <Field as="select" name="role">
                    <option value="derm">Dermatologist</option>
                    <option value="pharm">Pharmacist</option>
                    <option value="admin">Pharmacy Admin</option>
                  </Field>
                </div>
                <div>
                  Street:
                  <Field type="text" name="address.street" />
                </div>
                <div>
                  City:
                  <Field type="text" name="address.city" />
                </div>
                <div>
                  Country:
                  <Field type="text" name="address.country" />
                </div>
                <div>
                  Telephone:
                  <Field type="text" name="telephone" />
                </div>
                <Button type="submit">Create Employee</Button>
              </Form>
            )}
          </Formik>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
