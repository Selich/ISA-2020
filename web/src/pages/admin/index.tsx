import {
  Box,
  Button, Container, Input, Modal,
  ModalBody, ModalContent,
  ModalHeader,
  ModalOverlay,
  SimpleGrid,
  Spinner,
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
import { Loader } from "next/dynamic";
import React, { useState } from "react";
import DataTable from "react-data-table-component";
import { PharmacyDetails } from "../../components/admin/PharmacyDetails";
import { AdminHolidays } from "../../components/AdminHoliday";
import { Loading } from "../../components/Loading";
import { Profile } from "../../components/Profile";
import {
  useAddEmployeeMutation,
  useAddFreeAppMutation,
  useAddMedicineMutation,
  useAddPriceMutation,
  useAddWorkingHoursMutation,
  useAppointmentsQuery, useDermsByPharmQuery,
  useEmployeesQuery, useInventoryQuery,
  useMedicineQuery
} from "../../generated/graphql";
import { DatePickerField } from "../shop";

const TabMenu = () => (
  <TabList>
    <Tab>Pharmacists</Tab>
    <Tab>Dermatologists</Tab>
    <Tab>Inventory</Tab>
    <Tab>Order</Tab>
    <Tab>Derm Examinations</Tab>
    <Tab>Pharmacy</Tab>
    <Tab>Holidays</Tab>
    <Tab>Profile</Tab>
  </TabList>
);

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
  if (fetching) body = ( <Loading/>
  )

  else if (!data) body = ( <Loading/>
  )
  else {
    // @ts-ignore
    let events = [];
    let temp = data.appointments;

    // @ts-ignore
    temp.forEach((item) => {
      // @ts-ignore
      item.begin = new Date(item.begin);
      // @ts-ignore
      item["end"] = moment(item.begin).add(item.length, "m").toDate();
      events.push(item);
    });

    console.log(events);

    // @ts-ignore
    body = (
      <>
        <Box m="4" p="8" fontSize="2rem">
          <Box>
            <Tabs isFitted colorScheme="green">
              <TabMenu />
              <TabPanels>
                <TabPanel>
                  <Employees type={"pharm"} />
                </TabPanel>
                <TabPanel>
                  <Employees type={"derm"} />
                </TabPanel>
                <TabPanel>
                  <Inventory />
                </TabPanel>
                <TabPanel>
                  <Medicine />
                </TabPanel>
                <TabPanel>
                  <FreeDermExams />
                </TabPanel>
                <TabPanel>
                  <PharmacyDetails />
                </TabPanel>
                <TabPanel>
                  <AdminHolidays />
                </TabPanel>
                <TabPanel>
                  <Profile/>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Box>
        </Box>
      </>
    );
  }
  return body;
}

const FreeDermExams = () => {
  const [, addFreeApp] = useAddFreeAppMutation();
  const token = Cookies.get("token");
  const [selected, setSelected] = useState({}) 
  const [{fetching, data}] = useDermsByPharmQuery({
    variables: {
      token: token
    }
  })
  const handler = (row, time) => {};
  let columns = [
    { name: "FirstName", selector: "firstName", sortable: true },
    { name: "Role", selector: "role", sortable: true },
    { name: "Email", selector: "email", sortable: true },
        {
        name: "",
        button: true,
        cell: (row: any) => (
          <Button size="sm" onClick={() => setSelected(row)}>
            Select
          </Button>
        ),
      }
  ]
  let body = null;
  if (fetching) body = <div>Loading</div>;
  else if (!data) body = <div>Loading</div>;
  else {
    if(data.dermsByPharm){

      body = <DataTable title='Dermatologists working in Pharmacy' data={data.dermsByPharm} columns={columns} />;
    }
  }

  return (
    <Formik
      initialValues={{
        date: "",
        hours: 0,
        minutes: 0,
        length: 0,
        discount: 0,
      }}
      onSubmit={async (values, { setErrors }) => {
        let date = new Date(values.date);
        date.setTime(date.getTime() + 2 * 60 * 60 * 1000);
        if (values.hours)
          date.setTime(date.getTime() + values.hours * 60 * 60 * 1000);
        if (values.minutes)
          date.setTime(date.getTime() + values.minutes * 60 * 1000);


        let variables = {
          from: date + '',
          length: values.length,
          discount: values.discount,
          token: token,
          employee: {
            // @ts-ignore
            id: parseInt(selected.id),
            // @ts-ignore
            email: selected.email
          }
        };
        console.log(variables);

        addFreeApp(variables).then((res) => {
          console.log("Return");
          console.log(res);
        });
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <SimpleGrid columns={2} spacing={3}>
            <Box>
              {body}

            </Box>
            <Box>
          <div>
            <Text fontSize={16}>Date</Text>
            <DatePickerField name="date" />
          </div>
          <div>
            <Text fontSize={16}>Time</Text>
          </div>
          <div>
            <Text fontSize={16}>
              Hours: {"  "}
              <Field style={{ fontSize: 16 }} type="number" name="hours" />
              Minutes: {"  "}
              <Field style={{ fontSize: 16 }} type="number" name="minutes" />
            </Text>
          </div>
          <div>
            <Text fontSize={16}>
              Length: {"  "}
              <Field style={{ fontSize: 16 }} type="number" name="length" />
            </Text>
          </div>
          <div>
            <Text fontSize={16}>
              Discount: {"  "}
              <Field style={{ fontSize: 16 }} type="number" name="discount" />
            </Text>
          </div>

          <Button type="submit" fontSize={16}>
            Submit Free Exam
          </Button>
            </Box>
            </SimpleGrid>
        </Form>
      )}
    </Formik>
  );
};
const Medicine = () => {
  const [{ fetching, data }] = useMedicineQuery();
  const createModal = useDisclosure();
  const [selected, setSelected] = useState();

  const handler = (row) => {
    createModal.onOpen();
    setSelected(row);
  };
  const columns = [
    { name: "Code", selector: "code", sortable: true },
    { name: "Name", selector: "name", sortable: true },
    { name: "Kind", selector: "kind", sortable: true },
    { name: "Form", selector: "form", sortable: true },
    { name: "Points", selector: "points", sortable: true },
    {
      name: "",
      button: true,
      cell: (row: any) => (
        <Button size="md" onClick={() => handler(row)}>
          Order
        </Button>
      ),
    },
  ];

  let body = null;
  if (fetching) body = <div>Loading</div>;
  else if (!data) body = <div>Loading</div>;
  else {
    body = <DataTable title='Order Medicines' data={data.medicines} columns={columns} />;
  }

  return (
    <>
      {body}
      <MedicineModal
        selected={selected}
        onOpen={createModal.onOpen}
        isOpen={createModal.isOpen}
        onClose={createModal.onClose}
      />
    </>
  );
};
const MedicineModal = ({ selected, onOpen, isOpen, onClose }) => {
  const [, addMedicine] = useAddMedicineMutation();
  const token = Cookies.get("token");

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="">
      <ModalOverlay />
      <ModalContent maxW="56rem" maxH="106rem">
        <ModalHeader>
          <Text fontSize="xl">Order Medicine:</Text>
          {/* <div>
                  <Text>{selected.name}</Text>
                </div> */}
        </ModalHeader>
        <ModalBody>
          <Formik
            initialValues={{
              quantity: 0,
            }}
            onSubmit={async (values, { setErrors }) => {
              let variables = {
                inputs: {
                  quantity: values.quantity,
                  details: {
                    name: selected.name,
                    code: selected.code,
                  },
                },
                token: token,
              };

              addMedicine(variables).then((res) => {
                console.log(res);
                onClose();
              });
            }}
          >
            {({ isSubmitting }) => (
              <Form>
                <div>
                  Select Quantity:
                  <Field type="number" name="quantity" />
                </div>
                <Button type="submit">Order</Button>
              </Form>
            )}
          </Formik>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
const Inventory = () => {
  const token = Cookies.get("token");
  const [selected, setSelected] = useState();
  const [{ fetching, data }] = useInventoryQuery({
    variables: {
      token: token,
    },
  });
  const createModal = useDisclosure();

  const handler = (row) => {
    setSelected(row);
    createModal.onOpen();
  };
  const columns = [
    { name: "Name", selector: "details.name", sortable: true },
    { name: "Code", selector: "details.code", sortable: true },
    { name: "Quantity", selector: "quantity", sortable: true },
    { name: "Price", selector: "currentPrice", sortable: true },
    {
      name: "",
      button: true,
      cell: (row: any) => (
        <Button size="md" onClick={() => handler(row)}>
          Edit Price
        </Button>
      ),
    },
  ];

  let body = null;
  if (fetching) body = <div>Loading</div>;
  else if (!data) body = <div>Loading</div>;
  else {
    body = <DataTable title='Current Inventory' data={data.inventory} columns={columns} />;
  }

  return (
    <>
      <Button onClick={() => createModal.onOpen()}>Create Medicine</Button>
      {body}
      <SetPriceModal
        selected={selected}
        onOpen={createModal.onOpen}
        isOpen={createModal.isOpen}
        onClose={createModal.onClose}
      />
    </>
  );
};
const SetPriceModal = ({ selected, onOpen, isOpen, onClose }) => {
  const [, addPrice] = useAddPriceMutation();
  const token = Cookies.get("token");

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="">
      <ModalOverlay />
      <ModalContent maxW="56rem" maxH="106rem">
        <ModalHeader>
          <Text fontSize="xl">Edit Price</Text>
          {/* <div>
                  <Text>{selected.name}</Text>
                </div> */}
        </ModalHeader>
        <ModalBody>
          <Formik
            initialValues={{
              currentPrice:
                selected && selected.currentPrice ? selected.currentPrice : 0,
            }}
            onSubmit={async (values, { setErrors }) => {
              let variables = {
                inputs: {
                  id: parseInt(selected.id),
                  currentPrice: parseInt(values.currentPrice),
                },
                token: token,
              };

              addPrice(variables).then((res) => {
                console.log(res);
                onClose();
              });
            }}
          >
            {({ isSubmitting }) => (
              <Form>
                <div>
                  Edit Price:
                  <Field type="text" name="currentPrice" />
                </div>
                <Button type="submit">Set Price</Button>
              </Form>
            )}
          </Formik>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};


const FilterComponent = ({ filterText, onFilter, onClear }) => (
  <>
  <Container alignSelf="right">
    <Input
      id="search"
      type="text"
      w={500}
      placeholder="Filter By Name"
      aria-label="Search Input"
      value={filterText}
      onChange={onFilter}
    />
    <Button type="button" onClick={onClear}>
      X
    </Button>
  </Container>
  </>
);
const Employees = ({ type }) => {
  const createModal = useDisclosure();
  const whModal = useDisclosure();
  const token = Cookies.get("token");
  const [selected, setSelected] = useState({});
  let variables = {
    inputs: {
      role: type,
    },
    token: token,
  };
  const [{ fetching, data }] = useEmployeesQuery({ variables });
  const [filterText, setFilterText] = useState("");
  const subHeaderComponentMemo = React.useMemo(() => {
    const handleClear = () => {
      if (filterText) {
        setFilterText('');
      }
    };

    return <FilterComponent onFilter={e => setFilterText(e.target.value)} onClear={handleClear} filterText={filterText} />;
  }, [filterText]);
  const handler = (row) => {
    setSelected(row);
    whModal.onOpen();
  };
  let columns = [
    { name: "FirstName", selector: "firstName", sortable: true },
    { name: "Role", selector: "role", sortable: true },
    { name: "Email", selector: "email", sortable: true },
    {
      name: "",
      button: true,
      cell: (row: any) => (
        <Button size="sm" onClick={() => handler(row)}>
          Working Hours
        </Button>
      ),
    },
  ];
  if(type === 'pharm'){
   columns = [
    { name: "FirstName", selector: "firstName", sortable: true },
    { name: "Role", selector: "role", sortable: true },
    { name: "Pharmacy", selector: "pharmacy.name", sortable: true },
    { name: "Email", selector: "email", sortable: true },
  ];
  }
  let body = null;
  if (fetching) body = <div>Loading</div>;
  else if (!data) body = <div>Loading</div>;
  else {
    const filteredItems = data.employees.filter(
      (item) =>
        item.firstName && item.firstName.toLowerCase().includes(filterText.toLowerCase())
    );
    body = <DataTable title='Employees' data={filteredItems} columns={columns} />;
  }
  return (
    <>
      <Button onClick={() => createModal.onOpen()}>Create Pharmacists</Button>
      {body}
      <CreateModal
        onOpen={createModal.onOpen}
        isOpen={createModal.isOpen}
        onClose={createModal.onClose}
      />
      <WhModal
        selected={selected}
        onOpen={whModal.onOpen}
        isOpen={whModal.isOpen}
        onClose={whModal.onClose}
      />
    </>
  );
};
const WhModal = ({ selected, onOpen, isOpen, onClose }) => {
  const [, addWorkingHours] = useAddWorkingHoursMutation();
  const token = Cookies.get("token");

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="">
      <ModalOverlay />
      <ModalContent maxW="56rem" maxH="106rem">
        <ModalHeader>
          <Text fontSize="xl">Add Wokring Hours:</Text>
        </ModalHeader>
        <ModalBody>
          <Formik
            initialValues={{
              from: {
                h: selected.workingHours
                  ? selected.workingHours[0]
                    ? selected.workingHours[0].from.split(":")[0]
                    : ""
                  : "",
                m: selected.workingHours
                  ? selected.workingHours[0]
                    ? selected.workingHours[0].from.split(":")[1]
                    : ""
                  : "",
              },
              until: {
                h: selected.workingHours
                  ? selected.workingHours[0]
                    ? selected.workingHours[0].until.split(":")[0]
                    : ""
                  : "",
                m: selected.workingHours
                  ? selected.workingHours[0]
                    ? selected.workingHours[0].until.split(":")[1]
                    : ""
                  : "",
              },
            }}
            onSubmit={async (values, { setErrors }) => {
              let variables = {
                inputs: {
                  email: selected.email,
                  firstName: selected.firstName,
                  lastName: selected.lastName,
                  telephone: selected.telephone,
                  role: "pharm",
                  workingHours: [
                    {
                      from: values.from.h + ":" + values.from.m + ":00",
                      until: values.until.h + ":" + values.until.m + ":00",
                    },
                  ],
                },
                token: token,
              };
              console.log(variables);

              addWorkingHours(variables).then((res) => {
                onClose();
              });
            }}
          >
            {({ isSubmitting }) => (
              <Form>
                <div>From</div>
                <div>
                  Hours
                  <Field type="text" name="from.h" />
                  Minutes
                  <Field type="text" name="from.m" />
                </div>
                <div>Until</div>
                <div>
                  Hours
                  <Field type="text" name="until.h" />
                  Minutes
                  <Field type="text" name="until.m" />
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

const CreateModal = ({ onOpen, isOpen, onClose }) => {
  const [, addEmployee] = useAddEmployeeMutation();
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
              from: {
                h: "08",
                m: "00",
              },
              until: {
                h: "14",
                m: "00",
              },
            }}
            onSubmit={async (values, { setErrors }) => {
              let variables = {
                inputs: {
                  email: values.email,
                  firstName: values.firstName,
                  lastName: values.lastName,
                  telephone: values.telephone,
                  role: "pharm",
                  workingHours: [
                    {
                      from: values.from.h + ":" + values.from.m + ":00",
                      until: values.until.h + ":" + values.until.m + ":00",
                    },
                  ],
                },
                token: token,
              };
              console.log(variables);

              addEmployee(variables).then((res) => console.log(res));
            }}
          >
            {({ isSubmitting }) => (
              <Form>
                <Field type="email" name="email" />
                <Field type="text" name="firstName" />
                <Field type="text" name="lastName" />
                <Field type="text" name="address.street" />
                <Field type="text" name="address.city" />
                <Field type="text" name="address.country" />
                <Field type="text" name="telephone" />
                {/*  */}
                <div>From</div>
                <div>
                  Hours
                  <Field type="text" name="from.h" />
                  Minutes
                  <Field type="text" name="from.m" />
                </div>
                <div>Until</div>
                <div>
                  Hours
                  <Field type="text" name="until.h" />
                  Minutes
                  <Field type="text" name="until.m" />
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
