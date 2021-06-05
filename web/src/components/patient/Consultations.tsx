import {
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  Select,
} from "@chakra-ui/react";
import { Formik, Form, Field } from "formik";
import { values } from "rambda";
import React, { useState } from "react";
import DataTable from "react-data-table-component";
import { useAppointmentsPatientQuery, useFreePharmsQuery, useScheduleConsultationMutation, useUnschedulePatientMutation } from "../../generated/graphql";
import { DatePickerField } from "../../pages/shop";
import { HistoryTablePharm } from "../tables/HistoryTablePharm";

export const Consultations = () => {
  const examModal = useDisclosure();
  return (
    <>
      <Tabs colorScheme="green">
        <TabList>
          <Tab>Currently Scheduled</Tab>
          <Tab>History</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Button onClick={() => examModal.onOpen()}>
              Schedule Consultation
            </Button>
            <CurrentConsult type={'current'}/>
          </TabPanel>
          <TabPanel>
            <CurrentConsult type={'history'}/>
          </TabPanel>
        </TabPanels>
      </Tabs>
      <ScheduleConsultation
        isOpen={examModal.isOpen}
        onClose={examModal.onClose}
      />
    </>
  );
};

const CurrentConsult = ({type}) => {
  const token = Cookies.get('token')
  let [{ fetching, data }] = useAppointmentsPatientQuery({
    variables: {
      token: token,
      inputs: {
        kind: 'pharm'
      },
      type: type
    },
  });
  let [,unschedulePatient] = useUnschedulePatientMutation()

  const handler = (row) => {
    const variables = {
      inputs: {
        id: parseInt(row.id),
        begin: row.begin

      },
      token: token
    }
    console.log(variables)

    unschedulePatient(variables).then(
      res => {
        console.log(res)
        if(!res.data.unschedulePatient) alert('Less then 24h from the consulations')

      }
    )

  }
    const columns = [
      { name: "Begin", selector: "begin", sortable: true },
      { name: "Kind", selector: "kind", sortable: true },
      { name: "Doctor", selector: "employee.lastName", sortable: true },
      {
        name: "",
        button: true,
        cell: (row: any) => (
          <Button hidden={type === 'history'} size="sm" onClick={() => handler(row)}>
            Cancel
          </Button>
        ),
      }
    ];
  
  let body = null
  if(fetching) body = <div>Loading</div>
  else if(!data) body = <div>Loading</div>
  else {
    if(!data.appointmentsPatient) body = <div>Empty</div>
    else{
      console.log(data.appointmentsPatient)

    body = (
    <DataTable
      data={data.appointmentsPatient}
      columns={columns}

    />

    )
    }
  }

  return body
}

const arrayHours = [
  0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
  22, 23,
];

export const ScheduleConsultation = ({ isOpen, onClose }) => {
  const [desc, setDesc] = useState("");
  const [time, setTime] = useState({});
  const stageTwoModal = useDisclosure();

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} size="2xl">
        <ModalOverlay />
        <ModalContent maxW="56rem" maxH="106rem">
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
        </ModalContent>
      </Modal>
      <PharmacyList
        time={time}
        isOpen={stageTwoModal.isOpen}
        onClose={stageTwoModal.onClose}
      />
    </>
  );
};


import * as R from 'rambda'
const PharmacyList = ({ isOpen, time, onClose }) => {
  console.log(time);
  const [employees,setEmployees] = useState([])
  const [{ fetching, data }] = useFreePharmsQuery({
    variables: {
      inputs: {
        date: time.date,
        hours: time.hours,
        minutes: time.minutes
      }
    }
  });

  const stageThreeModal = useDisclosure();
  const handler = (row) => {
    setEmployees(row)
    stageThreeModal.onOpen()
    onClose()

  }


  let body = null
  if(fetching) body = <div>Loading</div>
  else if(!data) body = <div>Loading</div>
  else {
    // @ts-ignore

    let temp = []

    const columns = [
      { name: "Name", selector: "pharmacy.name", sortable: true },
      { name: "Rating", selector: "pharmacy.averageRating", sortable: true },
      { name: "Price", selector: "pharmacy.definitions[0].price", sortable: true },
      {
        name: "",
        button: true,
        cell: (row: any) => (
          <Button size="sm" onClick={() => handler(data.freePharms)}>
            Pick
          </Button>
        ),
      }
    ];
    console.log(data.freePharms)

    body = (
      <>
      <DataTable
        data={data.freePharms}
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
      <EmployeeList
        time={time}
        employees={employees}
        isOpen={stageThreeModal.isOpen}
        onClose={stageThreeModal.onClose}
      />
    </>
  );
};

import swal from "sweetalert";
import Cookies from "js-cookie";
const EmployeeList = ({ employees, isOpen, time, onClose }) => {
  const [, createConsultation] = useScheduleConsultationMutation()
  const token = Cookies.get('token')


  const handler = (row, time) => {
		let date = new Date(time.date)
		date.setTime(date.getTime() + (2*60*60*1000))
		if(time.hours)
			date.setTime(date.getTime() + (parseInt(time.hours)*60*60*1000))
		if(time.minutes)
			date.setTime(date.getTime() + (parseInt(time.minutes)*60*1000))

     let variables = {
       inputs: {
        employee: {
          email: row.email
        },
        price: row.pharmacy.definitions[0].price,
        begin: date

      },
      token:token
    }
    console.log(variables)

    createConsultation(variables).then(
      res=>{
        console.log('Return')
        console.log(res)
      }
    )

  }
  const columns = [
    { name: "Name", selector: "firstName", sortable: true },
    { name: "LastName", selector: "lastName", sortable: true },
    { name: "Price", selector: "averageRating", sortable: true },
    {
      name: "",
      button: true,
      cell: (row: any) => (
        <Button size="sm" onClick={() => handler(row, time)}>
          Pick
        </Button>
      ),
    }
  ];
  return (
    <>
    <Modal isOpen={isOpen} onClose={onClose} size="2xl">
      <ModalOverlay />
      <ModalContent maxW="56rem" maxH="106rem">
        <ModalHeader>Choose Pharmacy</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
      <DataTable
        data={employees}
        columns={columns}
      />
        </ModalBody>
        <ModalFooter>
          <Button>Next</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
      {/* <
        time={time}
        isOpen={stageThreeModal.isOpen}
        onClose={stageThreeModal.onClose}
      /> */}
    </>
  );
};
