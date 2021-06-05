import { EmailIcon } from "@chakra-ui/icons";
import {
  Text,
  Button,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Center,
  Box,
  SimpleGrid,
  Input,
  InputGroup,
  InputLeftAddon,
  useDisclosure,
  Container,
  Select,
  Textarea,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { Calendar } from "react-big-calendar";
import DataTable from "react-data-table-component";
import {
  useAppointmentsQuery,
  useCreatePrescriptionMutation,
  useGetMedicineForPatientQuery,
  useGetPatientQuery,
  usePatientQuery,
  useScheduleAppointmentEmployeeMutation,
  useScheduleConsultationMutation,
} from "../../../generated/graphql";
import { DatePickerField } from "../../../pages/shop";
import { TableComponent } from "../../tables/TableComponent";

// Dermatolog korisniku može da prepiše lek.

// Lek ne sme biti preporučen
// pacijentu ukoliko je pacijent alergičan na njega.

// Dermatolog može da pristupi
// specifikaciji leka i da definiše trajanje terapije u danima.

// Pre nego što preporuči
// lek, dermatolog šalje upit za proveru dostupnosti leka.

// Tek ukoliko je lek
// dostupan u trenutnoj apoteci u kojoj izvršava pregled, lek se prepisuje pacijentu.

// Ukoliko lek nije dostupan (nema ga na stanju u trenutnoj apoteci), sistem
// automatski šalje notifikaciju administratoru apoteke, a dermatologu se pruža
// mogućnost da pacijentu prepiše neki od zamenskih lekova (ukoliko pacijent nije
// alergičan).

export const Prescription = ({
  appointment,
  setMedicine,
  comment,
  setComment,
  medicine,
}) => {
  let columns = [
    { name: "Name", selector: "name", sortable: true },
    { name: "Type", selector: "type", sortable: true },
  ];
  const variables = {
    patientInput: { id: parseInt(appointment.patient.id) },
    pharmacyInput: { id: parseInt(appointment.pharmacy.id) },
  };

  const Prescribe = (row) => {
    setMedicine(row);
    console.log(comment);
    console.log(medicine);
  };

  return (
    <SimpleGrid columns={2} spacing={3}>
      <Box p={10}>
        <Text>Comments</Text>
        <Textarea type="text" onChange={(e) => setComment(e.target.value)} />
      </Box>
      <Box p={10}>
        <div>Selected Medicine:</div>
        <hr />
        <div>Name: {medicine.name}</div>
        <div>Type: {medicine.type}</div>
        <div>
          <TableComponent
            query={useGetMedicineForPatientQuery}
            handler={[Prescribe]}
            variables={variables}
            columns={columns}
          />
        </div>
      </Box>
    </SimpleGrid>
  );
};

export const ExaminationModal: any = ({
  appointment,
  onOpen,
  isOpen,
  onClose,
}) => {
  const [desc, setDesc] = useState("");
  const [medicines, setMedicines] = useState([]);
  const examModal = useDisclosure();

  const handleNotArived = () => {};
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} size="2xl">
        <ModalOverlay />
        <ModalContent maxW="56rem" maxH="106rem">
          <ModalHeader>Start Appointment</ModalHeader>
          <ModalCloseButton />
          <ModalFooter>
            <Button mr={3} onCLick={() => onClose()} colorScheme="red">
              Not Arrived
            </Button>
            <Button
              onClick={() => {
                examModal.onOpen();
                onClose();
              }}
            >
              Start
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <StepTwoModal
        appointment={appointment}
        onOpen={examModal.onOpen}
        onClose={examModal.onClose}
        isOpen={examModal.isOpen}
      />
    </>
  );
};

export const StepTwoModal: any = ({ appointment, onOpen, isOpen, onClose }) => {
  const [desc, setDesc] = useState("");
  const [medicines, setMedicines] = useState([]);
  const [comment, setComment] = useState("");
  const [medicine, setMedicine] = useState({ name: "", type: "" });
  const examModal = useDisclosure();

  let body = <div>Loading</div>;
  if (appointment.patient) {
    body = (
      <Prescription
        comment={comment}
        setComment={setComment}
        medicine={medicine}
        setMedicine={setMedicine}
        appointment={appointment}
      />
    );
  }
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} size="2xl">
        <ModalOverlay />
        <ModalContent maxW="56rem" maxH="106rem">
          <ModalHeader>Prescription</ModalHeader>
          <ModalCloseButton />
          <ModalBody>{body}</ModalBody>
          <ModalFooter>
            <Button
              onClick={() => {
                examModal.onOpen();
                onClose();
              }}
            >
              Next
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <StepThreeModal
        comment={comment}
        medicine={medicine}
        appointment={appointment}
        onOpen={examModal.onOpen}
        onClose={examModal.onClose}
        isOpen={examModal.isOpen}
      />
    </>
  );
};

export const StepThreeModal: any = ({
  appointment,
  comment,
  medicine,
  onOpen,
  isOpen,
  onClose,
}) => {
  const [desc, setDesc] = useState("");
  const [medicines, setMedicines] = useState([]);
  const [, createPrescription] = useCreatePrescriptionMutation();

  const handleSubmit = () => {
    let appointmentInputs = {
      id: parseInt(appointment.id),
      report: comment,
    };
    let medicineInput = {
      details: {
        id: medicine.id,
      },
      quantity: 1,
    };

    createPrescription({ appointmentInputs, medicineInput }).then((res) =>
      onClose()
    );
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="2xl">
      <ModalContent maxW="96rem" maxH="106rem">
        <ModalHeader>Schedule Appointment</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <ScheduleExamForm appointment={appointment} />
        </ModalBody>
        <ModalFooter>
          <Button onClick={handleSubmit}>Submit</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

import { momentLocalizer } from "react-big-calendar";
import moment from "moment";
import Cookies from "js-cookie";
import { Formik, Form, Field } from "formik";
export const ScheduleExamForm = ({ appointment }) => {
  let token = Cookies.get("token");
  const localizer = momentLocalizer(moment);

  const [{ fetching, data }] = useAppointmentsQuery({
    variables: {
      token: token,
      inputs: {
        employee: null,
      },
    },
  });

  const [patientQuery] = useGetPatientQuery({
    variables: {
      inputs: {
        id: parseInt(appointment.patient.id),
      },
    },
  });

  let body = null;
  let events = [];
  if (fetching) body = <div>loading</div>;
  else if (!data) body = <div>loading</div>;
  else {
    let events = [];
    data.appointments.forEach((item) => events.push(item));
    if (patientQuery.fetching) body = <div>loading</div>;
    else if (!patientQuery.data) body = <div>loading</div>;
    else {
      patientQuery.data.getPatient.forEach((item) =>
        events.push({
          ...item,
          begin: new Date(item.begin),
        })
      );
      console.log(events);

      body = (
        <SimpleGrid columns={2} spacing={3}>
          <Box>
            <Calendar
              selectable
              onKeyPressEvent={() => alert("test")}
              style={{ height: 600, width: "100%" }}
              localizer={localizer}
              components={{ event: Event }}
              events={events}
              startAccessor="begin"
            />
          </Box>
          <Box>
            <ScheduleForm appointment={appointment} />
          </Box>
        </SimpleGrid>
      );
    }
  }
  return body;
};

const arrayHours = [
  0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
  22, 23,
];
const ScheduleForm = ({ appointment }) => {
  const [, scheduleConsultation] = useScheduleAppointmentEmployeeMutation();
  const token = Cookies.get("token");

  const handler = (values) => {
          let date = new Date(values.date);
          date.setTime(date.getTime() + 2 * 60 * 60 * 1000);
          if (values.hours)
            date.setTime(
              date.getTime() + values.hours * 60 * 60 * 1000
            );
          if (values.minutes)
            date.setTime(date.getTime() + values.minutes * 60 * 1000);
          let variables = {
            inputs: {
              patient: {
                email: appointment.patient.email,
              },
              pharmacy: {
                id: parseInt(appointment.pharmacy.id),
              },
              kind: appointment.kind,
              begin: date,
            },
            token: token,
          };
          console.log(variables)
          scheduleConsultation(variables).then((res) => {
            console.log(res);
          });

  }

  return (
    <div>
      <Formik
        initialValues={{
          date: "",
          hours: 0,
          minutes: 0,
        }}
        onSubmit={(values, { setSubmitting }) => {
          setSubmitting(true);
          handler(values)
          setSubmitting(false);
        }}
      >
        {({ values, errors, isSubmitting }) => (
          <Form>
            Date:
            <DatePickerField name="date" value={values.date} />
            <div>
              Time
              <Field type="number" name="hours" />
              <Field type="number" name="minutes" />
            </div>
            <hr />
            <div>
              Patient:{" "}
              {appointment.patient.firstName +
                " " +
                appointment.patient.lastName}
            </div>
            <div>
              Doctor:{" "}
              {appointment.employee.firstName +
                " " +
                appointment.employee.lastName}
            </div>
            <div>
              <Button type="submit">Schedule New Appointment</Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};
const Event = (event) => {
  return (
    <>
      <div>{moment(event.event.begin).calendar()}</div>
    </>
  );
};
