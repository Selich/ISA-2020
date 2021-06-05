import {
  Box,
  Button, Modal,
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
import React, { useEffect, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import DataTable from "react-data-table-component";
import { EmployeeTable } from "../../components/tables/EmployeeTable";
import {
  useAddEmployeeMutation,
  useAddMedicineDefinitionMutation,
  useAddMedicineMutation,
  useEmployeesQuery, useHolidayQuery, useMedicineQuery
} from "../../generated/graphql";
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
                <Holidays />
              </TabPanel>
              <TabPanel>
                {/* <DermExaminations events={data.appointments}/> */}
              </TabPanel>
              <TabPanel>
                <Employees />
              </TabPanel>
              <TabPanel></TabPanel>
              <TabPanel>
                <Medicine/>

              </TabPanel>
              <TabPanel>{/* <Profile/> */}</TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </Box>
    </>
  );
}

const Medicine = () => {
  const [{fetching,data}] = useMedicineQuery()
  const createModal = useDisclosure();

	const columns = [
		{ name: "Name", selector: "name", sortable: true },
		{ name: "Kind", selector: "kind", sortable: true },
		{ name: "Form", selector: "form", sortable: true },
		{ name: "Points", selector: "points", sortable: true },
	];

  let body = null
  if(fetching) body = <div>Loading</div>
  else if(!data) body = <div>Loading</div>
  else{
    body = (
      <DataTable
      data={data.medicines}
      columns={columns}
      />

    )
  }

  return (
    <>
      <Button onClick={() => createModal.onOpen()}>Create Medicine</Button>
      {body}
      <MedicineModal
        onOpen={createModal.onOpen}
        isOpen={createModal.isOpen}
        onClose={createModal.onClose}
      />
      </>

  )

}
const MedicineModal = ({ onOpen, isOpen, onClose }) => {
  const [, addMedicine] = useAddMedicineDefinitionMutation();
  const token = Cookies.get('token')

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="">
      <ModalOverlay />
      <ModalContent maxW="56rem" maxH="106rem">
        <ModalHeader>
          <Text fontSize="xl">Create Medicine:</Text>
        </ModalHeader>
        <ModalBody>
          <Formik
            initialValues={{ 
              name: "", 
              info: "", 
              kind: "", 
              points:'',
              code:'',
              form: "", 
              contents: "", 
            }}
            onSubmit={async (values, { setErrors }) => {
              let variables = {
                inputs: {
                  name: values.name,
                  info: values.info,
                  kind: values.kind,
                  code: values.code + '',
                  points: parseInt(values.points),
                  form: values.form,
                  contents: values.contents,
                },
              }

              addMedicine(variables).then(res => {
                console.log(res)
                onClose()
              })

            }}
          >
            {({ isSubmitting }) => (
              <Form>
                <div>
                Name:
                <Field type="text" name="name"/>
                  </div>
                <div>
                Info:
                <Field type="text" name="info"/>
                </div>
                <div>
                Kind:
                <Field type="text" name="kind"/>
                </div>
                <div>
                Code:
                <Field type="text" name="code"/>
                </div>
                <div>
                Points:
                <Field type="text" name="points"/>
                </div>
                <div>
                Form:
                <Field type="text" name="form"/>
                </div>
                <div>
                Contents:
                <Field type="text" name="contents"/>
                </div>
                <Button type="submit">Create Medicine</Button>
              </Form>
            )}
          </Formik>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

const Employees = () => {
  const createModal = useDisclosure();
  const token = Cookies.get('token')
  let variables =
  {
    inputs:{
      role: "any"
    },
    token: token
  }
  const [{fetching,data}] = useEmployeesQuery({variables})
	const columns = [
		{ name: "FirstName", selector: "firstName", sortable: true },
		{ name: "Role", selector: "role", sortable: true },
		{ name: "Pharmacy", selector: "pharmacy.name", sortable: true },
		{ name: "Email", selector: "email", sortable: true },
	];
  let body = null
  if(fetching) body = <div>Loading</div>
  else if(!data) body = <div>Loading</div>
  else{
    body = (
      <DataTable
      data={data.employees}
      columns={columns}
      />
    )

  }
  return (
    <>
      <Button onClick={() => createModal.onOpen()}>Create Dermatologist</Button>
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
  const token = Cookies.get('token')

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
              address:{
                street: '',
                city: '',
                country: ''
              }, 
              telephone: "", 
            }}
            onSubmit={async (values, { setErrors }) => {
              let variables = {
                inputs: {
                  email: values.email,
                  firstName: values.firstName,
                  lastName: values.lastName,
                  telephone: values.telephone,
                  role: 'derm',
                },
                token: token
              }
              console.log(variables)

              addEmployee(variables).then(res => console.log(res))

            }}
          >
            {({ isSubmitting }) => (
              <Form>
                <Field type="email" name="email"/>
                <Field type="text" name="firstName"/>
                <Field type="text" name="lastName"/>
                <Field type="text" name="address.street"/>
                <Field type="text" name="address.city"/>
                <Field type="text" name="address.country"/>
                <Field type="text" name="telephone"/>
                <Button type="submit">Create Employee</Button>
              </Form>
            )}
          </Formik>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
